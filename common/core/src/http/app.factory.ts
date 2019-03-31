import { INestApplication, ValidationPipe } from "@nestjs/common";
import { CassandraExceptionFilter } from "../cassandra";
import { ApiResponseInterceptor } from "./api-response.interceptor";

export const appFactory = (app: INestApplication): INestApplication => {
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new CassandraExceptionFilter());
  return app;
};
