DROP TABLE IF EXISTS twtrmicro.users;

CREATE TABLE twtrmicro.users (
  username text PRIMARY KEY,
  password text,
  access_token text
);