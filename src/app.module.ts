import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import {WINSTON_MODULE_PROVIDER, WinstonModule} from 'nest-winston';
import { logger } from './helpers/winston.logger';

@Module({
  imports: [
    UsersModule,
    LoginModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60_000, // 1 minute
        limit: 3, // 3 requests, so no more than 3 requests in 1 minute
      },
      {
        name: 'long',
        ttl: 60_000, // 1 minute
        limit: 100, // 100 requests
      }
    ]),
    WinstonModule.forRoot({
            
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    {
      provide: WINSTON_MODULE_PROVIDER,
      useValue: logger
    }
  ],
  

})
export class AppModule {}
