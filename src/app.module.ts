import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import { VoteModule } from './core/vote/vote.module';
import { EventModule } from './core/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    VoteModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
