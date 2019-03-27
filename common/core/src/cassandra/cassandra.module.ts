import { Module } from "@nestjs/common";
import { CassandraService } from "./cassandra.service";
import { CassandraClientProviderModule } from "./cassandra-client-provider.module";

@Module({
  imports: [CassandraClientProviderModule],
  providers: [CassandraService],
  exports: [CassandraService],
})
export class CassandraModule {}
