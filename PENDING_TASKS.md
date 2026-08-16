# Tareas pendientes

## Limpieza periódica de refresh tokens expirados

### Contexto

La tabla `refresh_tokens` acumula registros indefinidamente. Las filas con `expires_at < NOW()` o `revoked = true` ya no sirven para nada y solo engordan la tabla. Se necesita un job que las limpie periódicamente.

### Implementación sugerida

**Dependencia a instalar:**
```bash
npm install @nestjs/schedule
```

**1. Registrar el módulo en `app.module.ts`:**
```ts
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // ...resto de imports
  ],
})
export class AppModule {}
```

**2. Agregar el método `cleanup()` en `RefreshTokensService`** (`src/modules/auth/refresh-tokens/refresh-tokens.service.ts`):
```ts
async cleanup(): Promise<number> {
  return this.refreshTokenModel
    .query()
    .delete()
    .where('revoked', true)
    .orWhere('expires_at', '<', new Date());
}
```

**3. Crear `src/modules/tasks/tasks.module.ts`:**
```ts
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RefreshTokensModule } from '../auth/refresh-tokens/refresh-tokens.module';

@Module({
  imports: [RefreshTokensModule],
  providers: [TasksService],
})
export class TasksModule {}
```

**4. Crear `src/modules/tasks/tasks.service.ts`:**
```ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RefreshTokensService } from '../auth/refresh-tokens/refresh-tokens.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async cleanupExpiredTokens() {
    const deleted = await this.refreshTokensService.cleanup();
    this.logger.log(`Refresh tokens cleanup: ${deleted} registros eliminados`);
  }
}
```

**5. Importar `TasksModule` en `app.module.ts`:**
```ts
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    // ...
  ],
})
```

### Archivos a crear / modificar

| Acción | Archivo |
|--------|---------|
| Modificar | `src/app.module.ts` |
| Modificar | `src/modules/auth/refresh-tokens/refresh-tokens.service.ts` |
| Crear | `src/modules/tasks/tasks.module.ts` |
| Crear | `src/modules/tasks/tasks.service.ts` |

### Notas

- El cron `EVERY_DAY_AT_3AM` es una sugerencia; ajustar según el volumen de logins esperado.
- Si el backend corre en múltiples instancias (horizontal scaling), asegurarse de que solo una instancia ejecute el cron, o migrar a un job externo (pg_cron, BullMQ, etc.).
- El método `cleanup()` retorna el número de filas eliminadas, útil para monitoreo/alertas.
