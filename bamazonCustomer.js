var inquirer = require('inquirer');
var mysql = require('mysql');
var cTable = require('console.table');

// Creates connection with MySQL
var connection = mysql.createConnection({
  
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourRootPassword',
  database: 'bamazon'

});

// Creates connection and throws error if needed
connection.connect(function(err) {
  if (err) throw err;
  console.log('\nWelcome to Bamazon');
  console.log('===================================================\n');

  // Displays products
  showProducts();

  // Prompts User
  promptUser();

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

// Function to prompt user to buy item(s)
function promptUser() {
    inquirer.prompt([
      {
        name: 'productID',
        type: 'input',
        message: '\n\nEnter the ID of the product you would like to purchase.\n\n\n\n'
      },
      {
        name: 'productQTY',
        type: 'input',
        message: '\n\nHow many of this item would you like to purchase?\n'
      }
  ])
  .then(function(answer) {

    // Creates variables for user's input
    var productID = answer.productID;
    var productQTY = answer.productQTY;

    connection.query('SELECT * FROM products WHERE id =' + productID, function (err, res) {

      if (err) throw err;

      // Displays error if customer's request cannot be fulfilled
      if (res[0].stock_quantity < productQTY) {
      console.log("\nSorry, we don't have enough of that item to fulfill your request.")
      }
      else {
      console.log('Your total is: $' + + (res[0].price * productQTY));
      
      // Creates variables for new product quantity
      var updatedProductQTY = res[0].stock_quantity - productQTY;
      
      // Calls function to update the product quantity in MySQL
      updateProduct(updatedProductQTY, productID);
      
      }
    })
  })
}

// Function to update the product quantity and prompt user to see if they'd like to buy more item(s)
function updateProduct(updatedProductQTY, productID) {
  connection.query('UPDATE products SET stock_quantity = ' + updatedProductQTY + ' WHERE id = ' + productID, function (err, res) {

      if(err) throw err;

      // Prompts user to see if they'd like to make another purchase  
      inquirer.prompt([
        {
          name: 'anotherTransaction',
          type: 'list',
          message: '\n\nWould you like to purchase more item(s)?\n',
          choices: ['yes', 'no']
        }
      ])
      .then(function(answer) {
      // console.log(answer.anotherTransaction);  

        // Creates variables for user's input
        var userInput = answer.anotherTransaction;
        
        // Takes user through purchase flow again
        if (userInput === 'yes') {
          showProducts();
          promptUser();
        }
        else {
          // Ends connection and shows good-bye message
          connection.end();
          console.log('\n\nThanks for shopping with Bamazon!');          
        }
      })
  });
}


