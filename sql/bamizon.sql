DROP DATABASE IF EXISTS bamizon;

CREATE DATABASE bamizon;
USE bamizon;

CREATE TABLE products (
    item_id int NOT NULL AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    department_name varchar(255),
	price float(10),
    stock_qty int(10),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;