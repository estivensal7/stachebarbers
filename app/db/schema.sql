DROP DATABASE IF EXISTS stacheBarbers;

CREATE DATABASE stacheBarbers;

USE stacheBarbers;

CREATE TABLE products (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        category_two VARCHAR(50),
        brand VARCHAR(50) NOT NULL,
        price FLOAT(6,2) default 0,
        stock INT NOT NULL default 0
);