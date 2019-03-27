import { Inject, Injectable } from "@nestjs/common";
import { Client } from "cassandra-driver";
import { camelCase, snakeCase } from "change-case";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { CASSANDRA_CLIENT } from "./cassandra-client-provider.module";
import { validate, ValidationError } from "class-validator";
import { CassandraValidationError } from "./cassandra.errors";

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

  async insert<T>(ctor: ClassType<T>, table: string, model: object): Promise<T> {
    // todo: createdAt, updatedAt as options

    const sorter = (a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };

    const classModel = plainToClass(ctor, model);
    const errors = await validate(classModel);
    if (errors.length > 0) {
      throw new CassandraValidationError(table, errors);
    } 

    const keys = Object.keys(model)
      .map((key: string) => snakeCase(key))
      .sort(sorter);

    const values = Object.entries(model)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => sorter(a.key, b.key))
      .map(adhoc => adhoc.value);

    const paramaterized = keys.map(_ => "?");

    const query = `INSERT INTO ${table} (${keys.join(
      ",",
    )}) VALUES (${paramaterized.join(",")})`;

    await this.cassandraClient.execute(query, values);
    return classModel;
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
