import { Inject, Injectable } from "@nestjs/common";
import { Channel } from "amqplib";
import { RABBITMQ_CHANNEL } from "./rabbitmq-channel-provider.module";

@Injectable()
export class RabbitmqService {
  private EXCHANGE = "twtrmicro";
  private TYPE = "topic";

  constructor(@Inject(RABBITMQ_CHANNEL) private channel: Channel) {}

  public async configurablePublish(
    exchange: string,
    type: string,
    topic: string,
    json: object,
  ): Promise<void> {
    await this.channel.assertExchange(exchange, type, {
      // todo: investigate how to configure this for use case
      durable: false,
    });
    await this.channel.publish(
      exchange,
      topic,
      Buffer.from(JSON.stringify(json)),
    );
  }

  public async publish(topic: string, json: object): Promise<void> {
    await this.configurablePublish(this.EXCHANGE, this.TYPE, topic, json);
  }
}
