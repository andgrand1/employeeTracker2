const mysql = require('mysql2');
const inquirer = require("inquirer");
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'Askg347489',
  database: '',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


