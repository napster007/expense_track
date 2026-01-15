CREATE TABLE expenses (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          transactionName VARCHAR(255) NOT NULL,
                          category VARCHAR(255) NOT NULL,
                          amount FLOAT NOT NULL,
                          isExpense SMALLINT DEFAULT 1 NOT NULL,
                          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);