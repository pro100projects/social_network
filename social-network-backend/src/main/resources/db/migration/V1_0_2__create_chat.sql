CREATE TABLE chats (
    id BIGSERIAL NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO chats VALUES
(1, '2022-05-09 16:16:30.594468'),
(2, '2022-05-09 16:16:30.594468'),
(3, '2022-05-09 16:16:30.594468'),
(4, '2022-05-09 16:16:30.594468'),
(5, '2022-05-09 16:16:30.594468'),
(6, '2022-05-09 16:16:30.594468');

CREATE TABLE chat_users (
    chat_id INT8 NOT NULL,
    user_id INT8 NOT NULL,
    PRIMARY KEY (chat_id, user_id)
);

ALTER TABLE chat_users ADD CONSTRAINT chat_users_chat_id FOREIGN KEY (chat_id) REFERENCES chats;
ALTER TABLE chat_users ADD CONSTRAINT chat_users_user_id FOREIGN KEY (user_id) REFERENCES users;

INSERT INTO chat_users VALUES
(1, 1), (1, 2),
(2, 2), (2, 3),
(3, 2), (3, 4),
(4, 2), (4, 5),
(5, 3), (5, 4),
(6, 3), (6, 5);