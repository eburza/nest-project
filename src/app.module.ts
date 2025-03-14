import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]), // throttle requests to 10 requests per minute
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // provide the throttler guard to the app
      useClass: ThrottlerGuard, // use the throttler guard in the app
    },
  ],
})
export class AppModule {}
