import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateManualDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the manual',
    example: 'Manual 1',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'The description of the manual',
    example: 'This is a manual',
  })
  readonly description: string;
}
