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

  public async configurableSubscribe(
    exchange: string,
    type: string,
    topic: string,
    callback: (msg: any) => any,
  ): Promise<void> {
    await this.channel.assertExchange(exchange, type, {
      // todo: investigate how to configure this for use case
      durable: false,
    });
    const { queue } = await this.channel.assertQueue(null, { exclusive: true });
    await this.channel.bindQueue(queue, exchange, topic);

    const parsedBufferCallback = buffer => {
      const payload = JSON.parse(buffer.content.toString());
      return callback(payload);
    };

    this.channel.consume(queue, parsedBufferCallback, { noAck: true });
  }

  public async subscribe(
    topic: string,
    callback: (msg: any) => any,
  ): Promise<void> {
    await this.configurableSubscribe(this.EXCHANGE, this.TYPE, topic, callback);
  }
}
