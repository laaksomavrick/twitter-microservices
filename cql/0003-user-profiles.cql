DROP TABLE IF EXISTS twtrmicro.user_profiles;

CREATE TABLE twtrmicro.user_profiles (
  username text PRIMARY KEY,
  email text,
  display_name text
);