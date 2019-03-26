import { Module } from '@nestjs/common';
import { Client } from 'cassandra-driver';
import config from './config';
import { plainToClass } from "class-transformer";
import { ClassType } from 'class-transformer/ClassTransformer';

export const CASSANDRA_CLIENT = 'CASSANDRA_CLIENT';

export const query = async <T>(ctor: ClassType<T>, client: Client, query: string, params: any[]): Promise<T[]> => {
  const { rows } = await client.execute(query, params);
  return rows.map((row) => plainToClass(ctor, row));
}

const cassandraClient = new Client({
  contactPoints: [
    `${config.get('cassandra.host')}:${config.get('cassandra.port')}`,
  ],
  localDataCenter: config.get('cassandra.dataCenter'),
  keyspace: config.get('cassandra.keyspace'),
});

const cassandraClientProvider = {
  provide: CASSANDRA_CLIENT,
  useValue: cassandraClient,
};

@Module({
  providers: [cassandraClientProvider],
  exports: [cassandraClientProvider],
})
export class CassandraModule {}