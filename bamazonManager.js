var inquirer = require('inquirer');
var mysql = require('mysql');

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
          choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
])
.then(function(answer) {

  // Creates variables for user's input
  var managerAnswer = answer.promptManager;

})
}



