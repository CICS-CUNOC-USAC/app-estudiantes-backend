import { Model } from 'objection';

export class RefreshTokenModel extends Model {
  static tableName = 'refresh_tokens';

  id: number;
  token_hash: string;
  jti: string | null;
  entity_type: 'user' | 'staff';
  entity_id: number;
  device_info: string | null;
  ip_address: string | null;
  expires_at: Date;
  revoked: boolean;
  created_at: Date;
  updated_at: Date;
}
