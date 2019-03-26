import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CassandraModule } from '../../../common/cassandra/src';

@Module({
  imports: [CassandraModule],
  controllers: [UsersController],
  providers: [UsersController, UsersService],
})
export class UsersModule {}
