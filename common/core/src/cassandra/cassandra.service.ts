import { Inject, Injectable } from "@nestjs/common";
import { Client } from "cassandra-driver";
import { camelCase } from "change-case";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { CASSANDRA_CLIENT } from "./cassandra-client-provider.module";

@Injectable()
export class CassandraService {
  constructor(@Inject(CASSANDRA_CLIENT) private cassandraClient: Client) {}

  async query<T>(
    ctor: ClassType<T>,
    query: string,
    params: any[],
  ): Promise<T[]> {
    const { rows } = await this.cassandraClient.execute(query, params);
    return rows.map(row => {
      const camelized = this.camelizeObject<T>(row);
      return plainToClass(ctor, camelized);
    });
  }

  private camelizeObject<T>(input: T): T {
    const obj = {} as T;
    const keys = Object.keys(input);
    for (const key of keys) {
      const value = input[key];
      const camelKey = camelCase(key);
      if (value !== Object(value) || value instanceof Date) {
        obj[camelKey] = value;
      } else if (Array.isArray(value)) {
        obj[camelKey] = this.camelizeArray(value);
      } else {
        obj[camelKey] = this.camelizeObject(value);
      }
    }
    return obj;
  }

  private camelizeArray<T>(input: T[]): T[] {
    return input.map((obj: T) => this.camelizeObject<T>(obj));
  }
}
