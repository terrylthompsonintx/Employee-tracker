const cTable = require('console.table');
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

  module.exports = processreq;