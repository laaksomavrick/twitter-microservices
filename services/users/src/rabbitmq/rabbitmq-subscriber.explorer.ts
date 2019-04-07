import { Injectable } from "@nestjs/common";
import { Controller } from "@nestjs/common/interfaces";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import { ModulesContainer } from "@nestjs/core/injector/modules-container";
import { MetadataScanner } from "@nestjs/core/metadata-scanner";
import {
  RABBITMQ_SUBSCRIBER,
  RabbitSubscriberMetadataConfiguration,
} from "./rabbitmq.decorators";

@Injectable()
export class RabbitmqSubscriberExplorer {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  public explore(): RabbitSubscriberMetadataConfiguration[] {
    // find all the controllers
    const modules = [...this.modulesContainer.values()];
    const controllersMap = modules
      .filter(({ controllers }) => controllers.size > 0)
      .map(({ controllers }) => controllers);

    // munge the instance wrappers into a nice format
    const instanceWrappers: InstanceWrapper<Controller>[] = [];
    controllersMap.forEach(map => {
      const mapKeys = [...map.keys()];
      instanceWrappers.push(
        ...mapKeys.map(key => {
          return map.get(key);
        }),
      );
    });

    // find the handlers marked with @Subscribe
    return instanceWrappers
      .map(({ instance }) => {
        const instancePrototype = Object.getPrototypeOf(instance);
        return this.metadataScanner.scanFromPrototype(
          instance,
          instancePrototype,
          method =>
            this.exploreMethodMetadata(instance, instancePrototype, method),
        );
      })
      .reduce((prev, curr) => {
        return prev.concat(curr);
      });
  }

  public exploreMethodMetadata(
    instance: object,
    instancePrototype: Controller,
    methodKey: string,
  ): RabbitSubscriberMetadataConfiguration | null {
    const targetCallback = instancePrototype[methodKey];
    const handler = Reflect.getMetadata(RABBITMQ_SUBSCRIBER, targetCallback);
    if (handler == null) {
      return null;
    }
    return handler;
  }
}
