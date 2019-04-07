export const RABBITMQ_SUBSCRIBER = "RABBITMQ_SUBSCRIBER";

export const Subscribe = (topic: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // descriptor.
    // console.log("decorated!");
    // console.log(topic); // twtrmicro.user.create
    // console.log(target); // UsersService {}
    // console.log(propertyKey); // handleUserCreated
    // console.log(descriptor); // { value: asyncFunction: something }
    // console.log(descriptor.value);
    // descriptor.value(); // calls subscribe
    // SetMetadata(RABBITMQ_SUBSCRIBER, {
    //   topic,
    //   target: target.constructor.name,
    //   methodName: propertyKey,
    // })(target, propertyKey, descriptor);
  };
};
