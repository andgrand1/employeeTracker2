INSERT INTO department (id, name) VALUES (1, 'HR');

INSERT INTO department (id, name) VALUES (2, 'Finance');

INSERT INTO department (id, name) VALUES (3, 'IT');

INSERT INTO department (id, name) VALUES (4, 'Marketing');

INSERT INTO department (id, name) VALUES (5, 'Sales');

INSERT INTO
    role (
        id,
        title,
        salary,
        department_id
    )
VALUES (1, 'Manager', 70000, 1);

INSERT INTO
    role (
        id,
        title,
        salary,
        department_id
    )
VALUES (2, 'Developer', 60000, 3);

INSERT INTO
    role (
        id,
        title,
        salary,
        department_id
    )
VALUES (3, 'Accountant', 55000, 2);

INSERT INTO
    role (
        id,
        title,
        salary,
        department_id
    )
VALUES (
        4,
        'Marketing Specialist',
        65000,
        4
    );

INSERT INTO
    role (
        id,
        title,
        salary,
        department_id
    )
VALUES (
        5,
        'Sales Representative',
        60000,
        5
    )

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (1, 'John', 'Doe', 1, NULL);

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (2, 'Jane', 'Smith', 2, 1);

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (3, 'Bob', 'Johnson', 3, 1);

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (4, 'Alice', 'Williams', 4, NULL);

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (5, 'Charlie', 'Brown', 2, 1);

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (6, 'Julia', 'Garcia', 5, NULL);

INSERT INTO
    employee (
        id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES (7, 'David', 'Miller', 2, 1);