CREATE TABLE posts (
    id BIGSERIAL NOT NULL,
    user_id INT8 NOT NULL,
    text VARCHAR(255),
    photo VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE posts ADD CONSTRAINT posts_user_id FOREIGN KEY (user_id) REFERENCES users;

CREATE TABLE liked_posts (
      post_id INT8 NOT NULL,
      user_id INT8 NOT NULL,
      PRIMARY KEY (post_id, user_id)
);

ALTER TABLE liked_posts ADD CONSTRAINT liked_posts_post_id FOREIGN KEY (post_id) REFERENCES posts;
ALTER TABLE liked_posts ADD CONSTRAINT liked_posts_user_id FOREIGN KEY (user_id) REFERENCES users;