const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    throw err;
  }
  console.log('Connected to MySQL database');
  startApp();
});

function viewAllDepartments() {
  const query = 'SELECT id, name FROM department';
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Error viewing departments:', err.message);
      throw err;
    }
    console.table(res);
    startApp();
  });
}

function addDepartment(departmentName) {
  const query = 'INSERT INTO department (name) VALUES (?)';
  connection.query(query, [departmentName], (err, res) => {
    if (err) {
      console.error('Error adding department:', err.message);
      throw err;
    }
    console.log(`Department ${departmentName} added to the database`);
    startApp();
  });
}

function updateEmployeeManager(employeeId, newManagerId) {
  const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
  connection.query(query, [newManagerId, employeeId], (err, res) => {
    if (err) {
      console.error('Error updating employee manager:', err.message);
      throw err;
    }
    console.log(`Employee ${employeeId} manager updated to ${newManagerId}`);
    startApp();
  });
}

function viewEmployeesByManager(managerId) {
  const query = 'SELECT * FROM employee WHERE manager_id = ?';
  connection.query(query, [managerId], (err, res) => {
    if (err) {
      console.error('Error viewing employees by manager:', err.message);
      throw err;
    }
    console.table(res);
    startApp();
  });
}

function viewEmployeesByDepartment(departmentId) {
    const query = 'SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id = ?';
    connection.query(query, [departmentId], (err, res) => {
      if (err) {
        console.error('Error viewing employees by department:', err.message);
        throw err;
      }
      console.table(res);
      startApp();
    });
  }
  

function deleteDepartment(departmentId) {
  const query = 'DELETE FROM department WHERE id = ?';
  connection.query(query, [departmentId], (err, res) => {
    if (err) {
      console.error('Error deleting department:', err.message);
      throw err;
    }
    console.log(`Department ${departmentId} deleted`);
    startApp();
  });
}

function deleteRole(roleId) {
  const query = 'DELETE FROM role WHERE id = ?';
  connection.query(query, [roleId], (err, res) => {
    if (err) {
      console.error('Error deleting role:', err.message);
      throw err;
    }
    console.log(`Role ${roleId} deleted`);
    startApp();
  });
}

function deleteEmployee(employeeId) {
  const query = 'DELETE FROM employee WHERE id = ?';
  connection.query(query, [employeeId], (err, res) => {
    if (err) {
      console.error('Error deleting employee:', err.message);
      throw err;
    }
    console.log(`Employee ${employeeId} deleted`);
    startApp();
  });
}

function viewDepartmentBudget(departmentId) {
    const query = 'SELECT SUM(role.salary) AS total_budget FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id = ?';
    connection.query(query, [departmentId], (err, res) => {
      if (err) {
        console.error('Error viewing department budget:', err.message);
        throw err;
      }
      console.log(`Total budget for Department ${departmentId}: $${res[0].total_budget}`);
      startApp();
    });
  }
  


function handleViewAllDepartments() {
  viewAllDepartments();
}

function handleAddDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
      },
    ])
    .then((departmentAnswer) => {
      addDepartment(departmentAnswer.departmentName);
    });
}

function handleUpdateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee:',
      },
      {
        type: 'input',
        name: 'newManagerId',
        message: 'Enter the ID of the new manager:',
      },
    ])
    .then((answers) => {
      updateEmployeeManager(answers.employeeId, answers.newManagerId);
    });
}

function handleViewEmployeesByManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the ID of the manager:',
      },
    ])
    .then((answers) => {
      viewEmployeesByManager(answers.managerId);
    });
}

function handleViewEmployeesByDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department:',
      },
    ])
    .then((answers) => {
      viewEmployeesByDepartment(answers.departmentId);
    });
}

function handleDeleteDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department to delete:',
      },
    ])
    .then((answers) => {
      deleteDepartment(answers.departmentId);
    });
}

function handleDeleteRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the ID of the role to delete:',
      },
    ])
    .then((answers) => {
      deleteRole(answers.roleId);
    });
}

function handleDeleteEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to delete:',
      },
    ])
    .then((answers) => {
      deleteEmployee(answers.employeeId);
    });
}

function handleViewDepartmentBudget() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the ID of the department:',
      },
    ])
    .then((answers) => {
      viewDepartmentBudget(answers.departmentId);
    });
}

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'Add a department',
          'Update employee manager',
          'View employees by manager',
          'View employees by department',
          'Delete department',
          'Delete role',
          'Delete employee',
          'View total department budget',
          'Exit',
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          handleViewAllDepartments();
          break;
        case 'Add a department':
          handleAddDepartment();
          break;
        case 'Update employee manager':
          handleUpdateEmployeeManager();
          break;
        case 'View employees by manager':
          handleViewEmployeesByManager();
          break;
        case 'View employees by department':
          handleViewEmployeesByDepartment();
          break;
        case 'Delete department':
          handleDeleteDepartment();
          break;
        case 'Delete role':
          handleDeleteRole();
          break;
        case 'Delete employee':
          handleDeleteEmployee();
          break;
        case 'View total department budget':
          handleViewDepartmentBudget();
          break;
        case 'Exit':
          connection.end();
          console.log('Exiting application');
          break;
        default:
          console.log('Invalid choice. Please try again.');
          startApp();
      }
    });
}
