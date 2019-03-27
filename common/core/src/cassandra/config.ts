import convict from 'convict';

const config = convict({
  cassandra: {
    host: {
      default: '127.0.0.1',
      env: 'CASSANDRA_HOST',
    },
    port: {
      default: 9042,
      env: 'CASSANDRA_PORT',
    },
    dataCenter: {
      default: 'datacenter1',
      env: 'CASSANDRA_DATA_CENTER',
    },
    keyspace: {
      default: 'twtrmicro',
      env: 'CASSANDRA_KEYSPACE',
    },
  },
});

export default config;
