DROP DATABASE IF EXISTS stacheBarbers;

CREATE DATABASE stacheBarbers;

USE stacheBarbers;

CREATE TABLE products (
        product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(50) NOT NULL,
        product_category VARCHAR(50) NOT NULL,
        product_brand VARCHAR(50) NOT NULL,
        product_price FLOAT(6,2) default 0,
        product_stock INT NOT NULL default 0
);