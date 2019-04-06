import convict from "convict";

const config = convict({
  rabbitmq: {
    port: {
      default: 5672,
      env: "RABBITMQ_PORT",
    },
    host: {
      default: "localhost",
      env: "RABBITMQ_HOST",
    },
    user: {
      default: "rabbitmq",
      env: "RABBITMQ_USER",
    },
    password: {
      default: "rabbitmq",
      env: "RABBITMQ_PASSWORD",
    },
  },
});

export default config;
