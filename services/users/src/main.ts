import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApiResponseInterceptor } from "core-module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
