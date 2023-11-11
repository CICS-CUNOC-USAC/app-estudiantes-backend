import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'Path to where the media file will be stored, if not provided, it will be stored in the root of the bucket ("/nocat")',
    examples: ['manuals', 'articles'],
  })
  path?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Type of resource to which the media is attached/referenced',
    examples: ['manual', 'article'],
  })
  attach_type: string;
}
