async function processreq(req){
    console.log(req)
    if (req == 'View all departments'){
      connection.promise().query ('SELECT * FROM department', function (err,results,fields){
        //clear();
        console.table(results);
      });
    }
    if  (req == 'View all roles'){
      connection.query ('SELECT * FROM role', function (err,results,fields){
        //clear();
        console.table(results);
        });
      }
      if  (req == 'View all employees'){
        connection.query ('SELECT * FROM employee', function (err,results,fields){
          //clear();
          console.table(results);
          });
      }
      if (req == 'Add a role'){
        await addarole();

      }
 }

 


  
  




  var ask = function(){
    inquirer.prompt(actions).then(answers=>{
      console.log(answers);
      if (answers.selectedaction != 'Quit program.'){
        processreq(answers.selectedaction);
        ask();
      }else {
        connection.end();
      } 

      return(answers);
      }).catch(err=>{throw err});
    
}