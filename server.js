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


