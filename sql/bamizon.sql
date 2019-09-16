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

insert into products(product_name, department_name, price, stock_qty)
values ("motherboard", "internals", 100.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("graphics card", "graphics", 100.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("audio card", "audio", 100.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("case", "externals", 100.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("psu", "power", 100.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("monitor", "externals", 100.00, 100);