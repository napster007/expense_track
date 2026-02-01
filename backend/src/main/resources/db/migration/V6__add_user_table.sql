CREATE TABLE users (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          username VARCHAR(255) NOT NULL,
                          password VARCHAR(255) NOT NULL,
                          status SMALLINT DEFAULT 1 NOT NULL,
                          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);