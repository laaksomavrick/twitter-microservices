import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraModule } from '../../../common/cassandra';

@Module({
  imports: [CassandraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
