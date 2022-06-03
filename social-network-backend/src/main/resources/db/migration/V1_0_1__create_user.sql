CREATE SEQUENCE id_seq START WITH 20 INCREMENT 1;

CREATE TABLE users (
    id BIGSERIAL NOT NULL,
    avatar VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    sex VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE users ADD CONSTRAINT users_email UNIQUE (email);
ALTER TABLE users ADD CONSTRAINT users_phone UNIQUE (phone);
ALTER TABLE users ADD CONSTRAINT users_username UNIQUE (username);

INSERT INTO users VALUES
(1, null, 'Out', 'Work', 'outwork', 'outwork@gmail.com', '380000000000', 'NO', '$2a$10$fFACJxlgjmEy00k7lFXO9.Yqc/KO6WxYONSKlKPQA2GTXCcKDa5fq', true),
(2, null, 'Богдан', 'Ткачук', 'pro100user', 'bogdan@gmail.com', '380972553991', 'MALE', '$2a$10$uE5QV3/NDPpMhhwIh9io3..i3B/vx0.r0eGpnCQLFV9DdUYa.Kjhq', true),
(3, null, 'Вадім', 'Скуратовський', 'vadim', 'vadim@gmail.com', '380958827299', 'MALE', '$2a$10$uE5QV3/NDPpMhhwIh9io3..i3B/vx0.r0eGpnCQLFV9DdUYa.Kjhq', true),
(4, null, 'Євген', 'Парацій', 'evhen', 'evhen@gmail.com', '380673174462', 'MALE', '$2a$10$uE5QV3/NDPpMhhwIh9io3..i3B/vx0.r0eGpnCQLFV9DdUYa.Kjhq', true),
(5, null, 'Андрій', 'Татарчук', 'andryi', 'andryi@gmail.com', '380680250112', 'MALE', '$2a$10$uE5QV3/NDPpMhhwIh9io3..i3B/vx0.r0eGpnCQLFV9DdUYa.Kjhq', true);

CREATE TABLE user_roles (
    user_id int8 NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, role)
);

ALTER TABLE user_roles ADD CONSTRAINT users_roles_user_id FOREIGN KEY (user_id) REFERENCES users;

INSERT INTO user_roles VALUES
(1, 'ROLE_USER'),
(1, 'ROLE_ADMIN'),
(2, 'ROLE_USER'),
(3, 'ROLE_USER'),
(4, 'ROLE_USER'),
(5, 'ROLE_USER');

CREATE TABLE subscriptions (
    user_id int8 NOT NULL,
    person_id int8 NOT NULL,
    PRIMARY KEY (user_id, person_id)
);

ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id FOREIGN KEY (user_id) REFERENCES users;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_person_id FOREIGN KEY (person_id) REFERENCES users;

INSERT INTO subscriptions VALUES
(2, 3),
(2, 4),
(2, 5),
(3, 4),
(3, 5);