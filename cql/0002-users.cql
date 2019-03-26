DROP TABLE IF EXISTS twtrmicro.users;

CREATE TABLE twtrmicro.users (
  username text PRIMARY KEY,
  email text,
  display_name text,
  password text
);