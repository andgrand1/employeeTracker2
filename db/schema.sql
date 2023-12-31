DROP DATABASE IF EXISTS employeeTracker2_db;

CREATE DATABASE employeeTracker2_db;

USE employeeTracker2_db;

CREATE TABLE
    department (
        id INT PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

CREATE TABLE
    role (
        id INT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES department(id)
    );

CREATE TABLE
    employee (
        id INT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role(id),
        FOREIGN KEY (manager_id) REFERENCES employee(id)
    );