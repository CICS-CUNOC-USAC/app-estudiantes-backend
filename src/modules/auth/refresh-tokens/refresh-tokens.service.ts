import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import * as crypto from 'crypto';
import { RefreshTokenModel } from './entities/refresh-token.model';

@Injectable()
export class RefreshTokensService {
  constructor(
    @Inject(RefreshTokenModel.name)
    private readonly refreshTokenModel: ModelClass<RefreshTokenModel>,
  ) {}

  async create(
    entityType: 'user' | 'staff',
    entityId: number,
    deviceInfo: string | null,
    ipAddress: string | null,
    jti: string,
  ): Promise<string> {
    const rawToken = crypto.randomBytes(48).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.refreshTokenModel.query().insert({
      token_hash: this.hash(rawToken),
      jti,
      entity_type: entityType,
      entity_id: entityId,
      device_info: deviceInfo,
      ip_address: ipAddress,
      expires_at: expiresAt,
      revoked: false,
    });

    return rawToken;
  }

  async findActiveByJti(jti: string): Promise<RefreshTokenModel | undefined> {
    return this.refreshTokenModel
      .query()
      .findOne({ jti, revoked: false })
      .where('expires_at', '>', new Date());
  }

  async verify(rawToken: string): Promise<RefreshTokenModel> {
    const record = await this.refreshTokenModel
      .query()
      .findOne({ token_hash: this.hash(rawToken) });

    if (!record || record.revoked || new Date(record.expires_at) < new Date()) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    return record;
  }

  async revoke(rawToken: string): Promise<void> {
    await this.refreshTokenModel
      .query()
      .patch({ revoked: true })
      .where({ token_hash: this.hash(rawToken) });
  }

  async revokeAll(
    entityType: 'user' | 'staff',
    entityId: number,
  ): Promise<void> {
    await this.refreshTokenModel
      .query()
      .patch({ revoked: true })
      .where({ entity_type: entityType, entity_id: entityId, revoked: false });
  }

  async listActive(
    entityType: 'user' | 'staff',
    entityId: number,
  ): Promise<RefreshTokenModel[]> {
    return this.refreshTokenModel
      .query()
      .select('id', 'entity_type', 'entity_id', 'device_info', 'ip_address', 'expires_at', 'created_at', 'updated_at')
      .where({ entity_type: entityType, entity_id: entityId, revoked: false })
      .where('expires_at', '>', new Date())
      .orderBy('created_at', 'desc');
  }

  async revokeById(
    id: number,
    entityType: 'user' | 'staff',
    entityId: number,
  ): Promise<void> {
    const affected = await this.refreshTokenModel
      .query()
      .patch({ revoked: true })
      .where({ id, entity_type: entityType, entity_id: entityId, revoked: false });
    if (!affected) {
      throw new NotFoundException('Sesión no encontrada');
    }
  }

  async cleanup(): Promise<number> {
    return this.refreshTokenModel
      .query()
      .delete()
      .where('revoked', true)
      .orWhere('expires_at', '<', new Date());
  }

  private hash(rawToken: string): string {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
  }
}
