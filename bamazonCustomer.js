var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');

// Creates connection with MySQL
var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Username
  user: 'root',

  // Password
  password: 'yourRootPassword',

  // Database
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  connection.end();
});


// Function to show products
function showProducts() {
  
  // Query for MySQL
  var query = 'Select * FROM products';

  connection.query(query, function (err, res) {

    if (err) throw err;

    for (var i = 0; i < res.length; i++) {

      // Displays data in a table
      console.table([
        {
          ID: res[i].id,
          Product: res[i].product_name,
          Department: res[i].department_name,
          Price: res[i].price,
          Stock: res[i].stock_quantity,
        }, 
      ]);
    }
  });
}

showProducts();