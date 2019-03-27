import { ValidationError } from "class-validator";

export class CassandraValidationError extends Error {
  constructor(
    public table: string,
    public errors?: ValidationError[],
  ) {
    super("An error occurred during cassandra validation");
  }
}