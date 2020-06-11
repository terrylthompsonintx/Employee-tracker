const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
var clear = require('clear');

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
    'Add a role', 
    'Add a department',
    'Add an employee',
    'Update an employee',
    'Quit program.']
  }];

  var addrole = [{
    type: 'input',
    name: 'roleName',
    message: 'Enter role name'
    }, 
    {type: 'number',
    name: 'roleSalary',
    message: 'Enter role salary'
    },
    {type:'list',
    name: 'roleDept',
    message: 'Select department',
    choices:['Engineering','Accounting','Marketing','Manufacturing']
    }
   ];

async function viewdept (){
  connection.promise().query ('SELECT * FROM department', function (err,results,fields){
    clear();
    console.table(results);
  });
};
async function viewrole (){
  connection.query ('SELECT * FROM role', function (err,results,fields){
    clear();
    console.table(results);
    });

};
async function viewemp (){
  connection.query ('SELECT * FROM employee', function (err,results,fields){
    clear();
    console.table(results);
    });
};      
async function addARole(){
  clear();
  return inquirer.prompt(addrole);
} 
async function addADept(){
  clear();
  return inquirer.prompt([{type:'input',name:'newdept', message: 'Enter new department name'}])
}
async function addAEmployee(){
  clear();
  return inquirer.prompt([
    {
      type: 'input',
      name: 'fname',
      message: 'Enter new employee first name',
    },
    {
      type: 'input',
      name: 'lname',
      message: 'Enter new employee last name',
    },
    {
      type: 'list',
      name: 'rname',
      message: 'Select new employee role',
      choices: ['Electronic Engineer','Software Engineer','Manager','Accountant','Marketing Advisor','Line assember']
    }
  ])
}

async function ask(){
  let run = true;
  while (run){
    let action = await inquirer.prompt(actions);
    console.log(action);
    if (action.selectedaction == 'View all departments'){
      await viewdept ();
    
    }
    if  (action.selectedaction== 'View all roles'){
      await viewrole ();
      
    };
    if  (action.selectedaction== 'View all employees'){
      await viewemp ();  
    };
    if (action.selectedaction == 'Quit program.'){
      run = false;
      connection.end();
    };
    if (action.selectedaction == 'Add a department'){
      let newdpt = await addADept();
      connection.query('INSERT INTO department SET ?',
      {
        name: newdpt.newdept
      }, 
      function(err, res) {
        if (err) throw err;
        
      }
      );
      viewdept ();
    };
    if (action.selectedaction == 'Add an employee'){
      let newEmp = await addAEmployee();
      console.log(newEmp);
        //(first_Name, last_Name, role_id, manager_id)
      let newrole = null;
      switch (newEmp.rname){
        case 'Electronic Engineer':{
          newrole=1;
          break;
        }
        case 'Software Engineer':{
          newrole=2;
          break;
        }
        case 'Manager':{
          newrole=3;
          break;
        }
        case 'Accountant':{
          newrole=4;
          break;
        }
        case 'Marketing Advisor':{
          newrole=5;
          break;
        }
        case 'Line assember':{
          newrole=6;
          break;
        }
      };   
      connection.query('INSERT INTO employee SET ?',
      {
        first_name: newEmp.fname,
        last_name: newEmp.lname,
        role_id: newrole
      }, 
      function(err, res) {
        if (err) throw err;
        }
      );
      await viewemp ();
    };
    if (action.selectedaction == 'Add a role'){
      let params = await addARole();
      let did = null;
      switch (params.roleDept){
        case 'Engineering':{
          did=1;
          break;
        }
        case 'Accounting':{
          did=2;
          break;
        }
        case 'Marketing':{
          did=3;
          break;
        }
        case 'Manufacturing':{
          did=4;
          break;
        }
      }; 
      connection.query('INSERT INTO role SET ?',
      {
      title: params.roleName,
      salary: params.roleSalary,
      department_id: did
      }, 
      function(err, res) {
        if (err) throw err;
        
      }
    );
    };
    await viewrole ();
  }
}



ask();
 

  



