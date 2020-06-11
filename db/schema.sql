DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
    d_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name varchar (30),
    PRIMARY KEY (d_id)
);

CREATE TABLE role (
    r_id  INTEGER(11) AUTO_INCREMENT NOT NULL,
    title varchar(30),
    salary decimal,
    department_id INTEGER,
    FOREIGN KEY (department_id) references department(d_id),
    PRIMARY KEY (r_id)
);


CREATE TABLE employee (
    c_id int(11) AUTO_INCREMENT NOT NULL,
    first_name varchar(30),
    last_name varchar(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(r_id),
    PRIMARY KEY (c_id)
);


