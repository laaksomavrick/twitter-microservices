import { Module } from "@nestjs/common";
import { Channel, connect } from "amqplib";
import config from "./config";

export const RABBITMQ_CHANNEL = "RABBITMQ_CHANNEL";

const rabbitmqChannelFactory = {
  provide: RABBITMQ_CHANNEL,
  useFactory: async (): Promise<Channel> => {
    const username = config.get("rabbitmq.user");
    const password = config.get("rabbitmq.password");
    const host = config.get("rabbitmq.host");
    const port = config.get("rabbitmq.port");
    const connection = await connect(
      `amqp://${username}:${password}@${host}:${port}`,
    );
    const channel = await connection.createChannel();
    return channel;
  },
};

@Module({
  providers: [rabbitmqChannelFactory],
  exports: [rabbitmqChannelFactory],
})
export class RabbitmqChannelProvider {}
