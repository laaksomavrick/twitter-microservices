
DROP KEYSPACE IF EXISTS twtrmicro;
CREATE KEYSPACE twtrmicro WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};