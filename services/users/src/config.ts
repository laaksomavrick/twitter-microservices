import convict from "convict";

const config = convict({
  users: {
    port: {
      default: "3000",
      format: "port",
      env: "PORT",
    },
  },
});

export default config;
