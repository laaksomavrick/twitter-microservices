import { Module } from "@nestjs/common";
import { RabbitmqChannelProvider } from "./rabbitmq-channel-provider.module";
import { RabbitmqService } from "./rabbitmq.service";

@Module({
  imports: [RabbitmqChannelProvider],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
