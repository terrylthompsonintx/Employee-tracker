const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


/* Psuedo code.
Set up the schema.
Seed the db.
Launch function ask for user input - action or quit
When user selects action peform action - sql.  Display results.  Launch ask again.  
If quit is selected, exit.  
*/

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Manhattan2!',
    database: 'employee_db'
  });

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
   
});  


  var actions = [{
    type: 'list',
    name:'selectedaction',
    message: 'Select an action.',
    choices: ['View all departments',
    'View all roles',
    'View all employees',
    new inquirer.Separator(),
    'Add a role', 
    'Add a department',
    'Add an employee',
    'Update an employee',
    new inquirer.Separator(),
    'Quit program.']
  }];

  var processreq = function(req){
    console.log(req)
    if (req == 'View all departments'){
      connection.promise().query ('SELECT * FROM department', function (err,results,fields){
        process.stdout.write('\033c');
        console.table(results);
      });
      }
    if  (req == 'View all roles'){
      connection.query ('SELECT * FROM role', function (err,results,fields){
        process.stdout.write('\033c');
        console.table(results);
      });
      } 
  }
  
  var ask = function(){
    var action = inquirer.prompt(actions).then(answers=>{
      console.log(answers);
      if (answers.selectedaction != 'Quit program.'){
        processreq(answers.selectedaction);
        ask();
      } else{
        connection.end();
      }
      }).catch(err=>{throw err});
    return;
  }

  ask();
 

  



