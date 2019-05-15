DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (id)
);

-- Inserts 10 mock data rows for products 
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('borderlands_three', 'video_games', 59.99, 2256),
       ('rage_two', 'video_games', 59.99, 1689),
       ('bose_headphones', 'audio', 349.00, 650),
       ('ps4_pro', 'consoles', 399.00, 623),
       ('xbox_one_x', 'consoles', 419.99, 500),
       ('tv_monitor', 'electronics', 299.99, 489),
       ('fire_tv_cube', 'electronics', 119.99, 440),
       ('vitamix_blender', 'kitchen', 425.00, 419),
       ('messenger_bag', 'accessories', 89.99, 306),
       ('sunglasses', 'accessories', 39.99, 250);


SELECT * FROM products;



