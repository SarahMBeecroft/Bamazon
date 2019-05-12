var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');

// Creates connection with MySQL
var connection = mysql.createConnection({
  host: 'localhost',

  // Port
  port: 3306,

  // Username
  user: 'root',

  // Password
  password: 'yourRootPassword',

  // Database
  database: 'bamazon'
});

// Creates connection and throws error if needed
connection.connect(function(err) {
  if (err) throw err;
  console.log('\nWelcome to Bamazon');
  console.log('===================================================\n');

  // Displays products
  showProducts();
  // connection.end();
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

// Function to prompt user
function promptUser() {
    inquirer.prompt([
      {
        name: 'productID',
        type: 'input',
        message: 'Enter the ID of the product you would like to purchase.\n'
      },
      {
        name: 'productQTY',
        type: 'input',
        message: 'How many of this item would you like to purchase?\n'
      }
  ])
  .then(function(answer) {

    // Creates variables for user's input
    var productID = answer.productID;
    var productQTY = answer.productQTY;

    connection.query('SELECT * FROM products WHERE id =' + productID, function (err, res) {

      if (err) throw err;

      // Displays error if customer's request cannot be fulfilled
      if (res[0].stock_quantity < productID) {
      console.log("Sorry, we don't have enough of that item to fulfill your request.")
      }
      else {
      console.log('Your total is: $' + + (res[0].price * productQTY));
      
      // Creates variables for new product quantity
      var updatedProductQTY = res[0].stock_quantity - productQTY;
        
      }
    })
  })
}


