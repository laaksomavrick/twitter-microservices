DROP TABLE IF EXISTS twtrmicro.users;

CREATE TABLE twtrmicro.users (
  username text PRIMARY KEY,
  email text,
  password text,
  refresh_token text
);