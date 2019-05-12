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
  console.log('\nWelcome Bamazon Manager!');
  console.log('===================================================\n');

  // Calls function to prompt manager
  promptManager();
});


// Function to prompt manager to see what they'd like to do
function promptManager() {
  inquirer.prompt([
    {
      name: 'promptManager',
          type: 'list',
          message: '\n\nWhich action would you like to take?\n',
          choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']
    }
])
.then(function(answer) {

  // Creates variables for user's input
  var managerAnswer = answer.promptManager;

  // If statements to choose which function to run
  if (managerAnswer === 'View Products for Sale'){
    viewProducts();
  }
  else if (managerAnswer === 'View Low Inventory'){
    viewLowInventory();
  }
  else if (managerAnswer === 'Add to Inventory') {
    addInventory();
  } 
  else if (managerAnswer === 'Add New Product') {
    addNewProduct();
  }
  else {
    // Ends connection and shows good-bye message
    connection.end();
    console.log('\n\nGood-bye!');  
  }

})
}


// Function to view all products
function viewProducts() {
  
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
  // Prompts user to go back to main menu or exit app
  inquirer.prompt([
    {
      name: 'stayOrExit',
          type: 'list',
          message: '\n\nWhich action would you like to take?\n',
          choices: ['Go Back to Main Menu', 'Exit']
    }
]).then(function(answer) {

  // Creates variables for user's input
  var managerAnswer = answer.stayOrExit;

  // If statements to choose which function to run
  if (managerAnswer === 'Go Back to Main Menu'){
    // Calls function to prompt manager
    promptManager();
  }
  else {
    // Ends connection and shows good-bye message
    connection.end();
    console.log('\n\nGood-bye!');  
  }
})
}