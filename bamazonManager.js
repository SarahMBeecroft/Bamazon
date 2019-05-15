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
connection.connect(function (err) {
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
    .then(function (answer) {

      // Creates variables for user's input
      var managerAnswer = answer.promptManager;

      // If statements to choose which function to run
      if (managerAnswer === 'View Products for Sale') {
        viewProducts();
      }
      else if (managerAnswer === 'View Low Inventory') {
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
  ]).then(function (answer) {

    // Creates variables for user's input
    var managerAnswer = answer.stayOrExit;

    // If statements to choose which function to run
    if (managerAnswer === 'Go Back to Main Menu') {
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


// Function to view low inventory 
function viewLowInventory() {

  // Query for MySQL to show stock that has less than 500 in stock
  var query = 'Select * FROM products WHERE stock_quantity < 500';

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
  ]).then(function (answer) {

    // Creates variables for user's input
    var managerAnswer = answer.stayOrExit;

    // If statements to choose which function to run
    if (managerAnswer === 'Go Back to Main Menu') {
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



// Function to add to inventory
function addInventory() {

  // Displays products
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
  inquirer.prompt([{
    name: 'addInventory',
    type: 'input',
    message: 'Enter the ID of the product you would like to add inventory to\n\n'
  },
  {
    name: 'howMany',
    type: 'input',
    message: 'How many would you like to add?\n\n',
  }
  ]).then(function (answers) {
    connection.query('SELECT * FROM products where `id` = ?', [answers.addInventory], function (err, res) {
      if (err) {
        console.log(err);
        throw err;
      }
      if (res.length === 0) {
        console.log("Sorry, we couldn't locate that product ID");
      } else {
        var newQuantity = parseInt(answers.howMany) + parseInt(res[0].stock_quantity);
        connection.query(
          'UPDATE products SET ? WHERE ?',
          [{stock_quantity: newQuantity},
          {id: answers.addInventory}],
          function (err, res) {
            if (err) {
              console.log(err);
              throw err;
            }
            if (res.affectedRows === 1) {
              console.log("Your stock has been successfully updated!");
            }

          });
      }
    });
  });
}

