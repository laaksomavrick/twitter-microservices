import { Module, OnModuleInit } from "@nestjs/common";
import { RabbitmqChannelProvider } from "./rabbitmq-channel-provider.module";
import { RabbitmqService } from "./rabbitmq.service";
import { MetadataScanner } from "@nestjs/core/metadata-scanner";
import { RabbitmqSubscriberExplorer } from "./rabbitmq-subscriber.explorer";

@Module({
  imports: [RabbitmqChannelProvider],
  providers: [RabbitmqService, MetadataScanner, RabbitmqSubscriberExplorer],
  exports: [RabbitmqService],
})
export class RabbitmqModule implements OnModuleInit {
  constructor(
    private readonly explorer: RabbitmqSubscriberExplorer,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  async onModuleInit() {
    // find everything marked with @Subscribe
    const subscribers = this.explorer.explore();
    // set up subscriptions
    for (const subscriber of subscribers) {
      await this.rabbitmqService.subscribe(
        subscriber.topic,
        subscriber.callback,
      );
    }
  }
}
