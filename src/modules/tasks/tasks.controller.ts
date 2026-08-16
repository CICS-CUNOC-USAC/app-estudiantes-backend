import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { StaffLoginJwtAuthGuard } from 'src/core/guards/jwt-staff-auth.guard';

// TODO: remove this controller before going to production, or keep it behind a superadmin guard
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(StaffLoginJwtAuthGuard)
  @Post('cleanup')
  async triggerCleanup() {
    const deleted = await this.tasksService.cleanupExpiredTokens();
    return { deleted };
  }
}
