import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CassandraModule } from 'core-module';

@Module({
  imports: [CassandraModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
