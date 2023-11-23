const mysql = require('mysql2');
const inquirer = require("inquirer");
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

function viewAllDepartments() {
    const query = 'SELECT id, name FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  }
  
  function addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    connection.query(query, [departmentName], (err, res) => {
      if (err) throw err;
      console.log(`Department ${departmentName} added to the database`);
      startApp();
    });
  }

  function updateEmployeeManager(employeeId, newManagerId) {
    const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    connection.query(query, [newManagerId, employeeId], (err, res) => {
      if (err) throw err;
      console.log(`Employee ${employeeId} manager updated to ${newManagerId}`);
      startApp();
    });
  }
  
  function viewEmployeesByManager(managerId) {
    const query = 'SELECT * FROM employee WHERE manager_id = ?';
    connection.query(query, [managerId], (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  }
  
  function viewEmployeesByDepartment(departmentId) {
    const query = 'SELECT * FROM employee WHERE department_id = ?';
    connection.query(query, [departmentId], (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    });
  }
  
  function deleteDepartment(departmentId) {
    const query = 'DELETE FROM department WHERE id = ?';
    connection.query(query, [departmentId], (err, res) => {
      if (err) throw err;
      console.log(`Department ${departmentId} deleted`);
      startApp();
    });
  }
  
  function deleteRole(roleId) {
    const query = 'DELETE FROM role WHERE id = ?';
    connection.query(query, [roleId], (err, res) => {
      if (err) throw err;
      console.log(`Role ${roleId} deleted`);
      startApp();
    });
  }
  
  function deleteEmployee(employeeId) {
    const query = 'DELETE FROM employee WHERE id = ?';
    connection.query(query, [employeeId], (err, res) => {
      if (err) throw err;
      console.log(`Employee ${employeeId} deleted`);
      startApp();
    });
  }
  
  function viewDepartmentBudget(departmentId) {
    const query = 'SELECT SUM(salary) AS total_budget FROM employee WHERE department_id = ?';
    connection.query(query, [departmentId], (err, res) => {
      if (err) throw err;
      console.log(`Total budget for Department ${departmentId}: $${res[0].total_budget}`);
      startApp();
    });
  }

