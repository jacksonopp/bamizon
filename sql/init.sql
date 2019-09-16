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
values ("CPU", "main logic", 279.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("CPU Cooler", "heat management", 50.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("Motherbord", "main logic", 170.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("RAM", "main logic", 79.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("HDD", "Storage", 100.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("SDD", "Storage", 200.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("GPU", "Graphics", 499.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("Case", "Accessories", 89.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("PSU", "Power", 120.00, 100);

insert into products(product_name, department_name, price, stock_qty)
values ("monitor", "externals", 100.00, 100);

-- UPDATE products
-- SET stock_qty=99
-- WHERE item_id = 1;