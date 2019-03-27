import { Module } from "@nestjs/common";
import { Client } from "cassandra-driver";
import config from "./config";

export const CASSANDRA_CLIENT = "CASSANDRA_CLIENT";

const cassandraClient = new Client({
  contactPoints: [
    `${config.get("cassandra.host")}:${config.get("cassandra.port")}`,
  ],
  localDataCenter: config.get("cassandra.dataCenter"),
  keyspace: config.get("cassandra.keyspace"),
});

const cassandraClientProvider = {
  provide: CASSANDRA_CLIENT,
  useValue: cassandraClient,
};

@Module({
  providers: [cassandraClientProvider],
  exports: [cassandraClientProvider],
})
export class CassandraClientProviderModule {}
