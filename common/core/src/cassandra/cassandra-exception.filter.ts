import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CassandraError } from "./cassandra.errors";

@Catch(CassandraError)
export class CassandraExceptionFilter implements ExceptionFilter {
  catch(exception: CassandraError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status;
    const error = exception.error;
    const message = exception.errors;

    response.status(status).json({
      statusCode: status,
      error,
      message,
    });
  }
}
