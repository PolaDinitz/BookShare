import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule,UsersModule],
  controllers: [AppController],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
