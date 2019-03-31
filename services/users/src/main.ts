import { NestFactory } from "@nestjs/core";
import { appFactory } from "core-module";
import { AppModule } from "./app.module";
import config from "./config";

async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app = appFactory(app);
  await app.listen(config.get("users.port"));
}
bootstrap();
