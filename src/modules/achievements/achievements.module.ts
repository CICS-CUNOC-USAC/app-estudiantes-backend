import { Module } from '@nestjs/common';
import { DatabaseTransactionModule } from 'src/database/transaction/database-transaction.module';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { CertificateParserService } from './certificate-parser.service';

@Module({
  imports: [DatabaseTransactionModule],
  controllers: [AchievementsController],
  providers: [AchievementsService, CertificateParserService],
})
export class AchievementsModule {}