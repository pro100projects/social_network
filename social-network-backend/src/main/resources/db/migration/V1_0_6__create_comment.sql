CREATE TABLE post_comments (
    id BIGSERIAL NOT NULL,
    user_id INT8 NOT NULL,
    post_id INT8 NOT NULL,
    text VARCHAR(255) NOT NULL,
    forward_id INT8,
    sent_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE post_comments ADD CONSTRAINT comments_user_id FOREIGN KEY (user_id) REFERENCES users;
ALTER TABLE post_comments ADD CONSTRAINT comments_post_id FOREIGN KEY (post_id) REFERENCES posts;

CREATE TABLE liked_comments (
    comment_id INT8 NOT NULL,
    user_id INT8 NOT NULL,
    PRIMARY KEY (comment_id, user_id)
);

ALTER TABLE liked_comments ADD CONSTRAINT liked_comments_comment_id FOREIGN KEY (comment_id) REFERENCES post_comments;
ALTER TABLE liked_comments ADD CONSTRAINT liked_comments_user_id FOREIGN KEY (user_id) REFERENCES users;
