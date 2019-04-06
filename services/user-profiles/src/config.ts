import convict from "convict";

const config = convict({
  userProfiles: {
    port: {
      default: "3001",
      format: "port",
      env: "PORT",
    },
  },
});

export default config;
