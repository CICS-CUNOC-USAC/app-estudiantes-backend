import { SetMetadata } from '@nestjs/common';

export const CHECK_ABILITY = 'check_ability';

export interface Permission {
  action: string;
  subject: string;
  conditions?: any;
}

export const CheckAbilities = (...requirements: Permission[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
