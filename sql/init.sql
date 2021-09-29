CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user(
  uuid uuid DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (uuid)
)

INSERT INTO application_user (email, password) VALUES ('admin@admin.com', crypt('admin', '********'));