CREATE TABLE messages (
    id BIGSERIAL NOT NULL,
    user_id INT8 NOT NULL,
    chat_id INT8 NOT NULL,
    text VARCHAR(255),
    photo VARCHAR(255),
    forward_id INT8,
    forward_type VARCHAR(255),
    is_updated BOOLEAN NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE messages ADD CONSTRAINT messages_user_id FOREIGN KEY (user_id) REFERENCES users;
ALTER TABLE messages ADD CONSTRAINT messages_chat_id FOREIGN KEY (chat_id) REFERENCES chats;

INSERT INTO messages VALUES
(1, 2, 2, 'Привіт', null, null, null, false, '2022-05-09 17:16:30.594468'),
(2, 3, 2, 'Привіт', null, null, null, false, '2022-05-09 17:17:00.594468'),
(3, 2, 2, 'Шо робиш?', null, null, null, false, '2022-05-09 17:17:30.594468'),
(4, 2, 2, 'Як справи?', null, null, null, false, '2022-05-09 17:18:00.594468'),
(5, 3, 2, 'Пишу проект', null, 3, 'MESSAGE', false, '2022-05-09 17:18:30.594468'),
(6, 3, 2, 'Все добре', null, 4, 'MESSAGE', false, '2022-05-09 17:18:30.594468'),
(7, 3, 2, 'А ти як?', null, 3, 'MESSAGE', false, '2022-05-09 17:19:00.594468');

CREATE TABLE read_messages (
    message_id INT8 NOT NULL,
    user_id INT8 NOT NULL,
    PRIMARY KEY (message_id, user_id)
);

ALTER TABLE read_messages ADD CONSTRAINT read_messages_message_id FOREIGN KEY (message_id) REFERENCES messages;
ALTER TABLE read_messages ADD CONSTRAINT read_messages_user_id FOREIGN KEY (user_id) REFERENCES users;

INSERT INTO read_messages VALUES
(1, 3),
(2, 2),
(3, 3),
(4, 3),
(5, 2);

CREATE TABLE liked_messages (
    message_id INT8 NOT NULL,
    user_id INT8 NOT NULL,
    PRIMARY KEY (message_id, user_id)
);

ALTER TABLE liked_messages ADD CONSTRAINT liked_messages_message_id FOREIGN KEY (message_id) REFERENCES messages;
ALTER TABLE liked_messages ADD CONSTRAINT liked_messages_user_id FOREIGN KEY (user_id) REFERENCES users;

INSERT INTO liked_messages VALUES
(5, 2);