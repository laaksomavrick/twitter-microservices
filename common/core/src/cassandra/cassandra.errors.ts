import { ValidationError } from "class-validator";

export class CassandraError extends Error {
  constructor(
    public table: string,
    public errors?: any[],
    public status = 500,
    public error = "Cassandra error",
  ) {
    super("An error occurred with cassandra");
  }
}

export class CassandraValidationError extends CassandraError {
  constructor(
    public table: string,
    public errors?: ValidationError[],
    public status = 400,
    public error = "Cassandra validation error",
  ) {
    super("An error occurred during cassandra validation");
  }
}
