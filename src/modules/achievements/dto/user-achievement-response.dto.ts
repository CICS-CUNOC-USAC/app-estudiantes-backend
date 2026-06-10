import { ApiProperty } from '@nestjs/swagger';

class UserAchievementCourseDto {
  @ApiProperty({ example: '2805' })
  code: string;

  @ApiProperty({ example: 'Estructura de Datos' })
  name: string;
}

export class UserAchievementResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Aprobo Estructura de Datos' })
  title: string;

  @ApiProperty({
    example: 'Completaste exitosamente el curso de Estructura de Datos.',
  })
  description: string;

  @ApiProperty({ example: null, nullable: true })
  iconUrl: string | null;

  @ApiProperty({ example: 67, nullable: true })
  grade: number | null;

  @ApiProperty({ example: '2024-05-06' })
  approvedAt: string;

  @ApiProperty({ example: '2026-04-23T10:00:00.000Z' })
  earnedAt: string | Date;

  @ApiProperty({ type: UserAchievementCourseDto })
  course: UserAchievementCourseDto | null;
}
