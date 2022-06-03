CREATE TABLE profiles (
    id BIGSERIAL NOT NULL,
    user_id INT8 NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE profiles ADD CONSTRAINT profiles_user_id FOREIGN KEY (user_id) REFERENCES users;