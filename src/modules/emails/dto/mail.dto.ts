import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { EMAIL_TEMPLATES_NAMES } from 'src/core/email/consts';

export class MailDto {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @MaxLength(255)
  subject: string;

  // @IsNotEmpty()
  @IsOptional()
  text: string;

  // @IsNotEmpty()
  @IsOptional()
  html: string;

  @IsNotEmpty()
  @IsIn(Object.values(EMAIL_TEMPLATES_NAMES))
  template: (typeof EMAIL_TEMPLATES_NAMES)[keyof typeof EMAIL_TEMPLATES_NAMES];

  @IsNotEmpty()
  context: Record<string, any>;
}
