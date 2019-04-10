import { SetMetadata } from "@nestjs/common";

export const RABBITMQ_SUBSCRIBER = "RABBITMQ_SUBSCRIBER";

export interface RabbitSubscriberMetadataConfiguration {
  topic: string;
  methodName: string;
  target: string;
  callback(msg: any): Promise<any>;
}

export const Subscribe = (topic: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    SetMetadata<string, RabbitSubscriberMetadataConfiguration>(
      RABBITMQ_SUBSCRIBER,
      {
        topic,
        target: target.constructor.name,
        methodName: propertyKey,
        callback: descriptor.value,
      },
    )(target, propertyKey, descriptor);
  };
};
