const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/html_renderer");

const employeeArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function Employee() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is your employee's role?",
            choices: ["manager", "engineer", "intern", "done!"]
        }
    ]).then(function({role}){
        console.log(role)
        switch (role){
            default: 
                console.log("done for now")
                break;

            case "manager":
                managerFunc();
                break;

            case "engineer":
                engineerFunc();
                break;

            case "intern":
                internFunc();
                break;

            case "done!":
                console.log("create website!")
                if(employeeArray === undefined || employeeArray.length == 0){
                    console.log("please choose an option and add employee info")
                    Employee();
                    
                }else{
                    var htmlstring = render(employeeArray);
                    console.log(htmlstring)
                    fs.writeFile("team.html", htmlstring, function(err) {
                        if (err) {
                          return console.log(err);
                        }
                        console.log("Success!");
                      }); 
                }
                break;
        }
    })
}

function noManagerFunc() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is your employee's role?",
            choices: ["engineer", "intern", "done!"]
        }
    ]).then(function({role}){
        console.log(role)
        switch (role){
            default: 
                console.log("done for now")
                break;

            case "engineer":
                engineerFunc();
                break;

            case "intern":
                internFunc();
                break;

            case "done!":
                console.log("create website!")
                
                    var htmlstring = render(employeeArray);
                    console.log(htmlstring)
                    fs.writeFile("team.html", htmlstring, function(err) {
                        if (err) {
                          return console.log(err);
                        }
                        console.log("Success!");
                      });
                
                break;
        }
    })
}

function managerFunc(){
    console.log("manager function");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your employee name?"
        },
        {
            type: "input",
            name: "id",
            message: "what is your employee id?"
        },
        {
            type: "input",
            name:"email",
            message:"what is your employee email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "what is your manager's office number?"
        }
    ]).then(function({name,id,email,officeNumber}){
        const newManager = new Manager(name, id, email, officeNumber)
        employeeArray.push(newManager);
        console.log(employeeArray)
        noManagerFunc();
    })
   
}

function engineerFunc(){
    console.log("engineer function");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your employee name?"
        },
        {
            type: "input",
            name: "id",
            message: "what is your employee id?"
        },
        {
            type: "input",
            name:"email",
            message:"what is your employee email?"
        },
        {
            type: "input",
            name: "github",
            message: "what is your engineer's github username?"
        }
    ]).then(function({name,id,email,github}){
        const newEngineer = new Engineer (name, id, email, github)
        
        employeeArray.push(newEngineer);
        console.log(employeeArray)
        noManagerFunc();
    })
    
}

function internFunc(){
    console.log("intern function");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your employee name?"
        },
        {
            type: "input",
            name: "id",
            message: "what is your employee id?"
        },
        {
            type: "input",
            name:"email",
            message:"what is your employee email?"
        },
        {
            type: "input",
            name: "school",
            message: "what school does your intern go to?"
        }
    ]).then(function({name,id,email,school}){
        const newIntern = new Intern (name, id, email, school)
        
        employeeArray.push(newIntern);
        console.log(employeeArray)
        noManagerFunc();
    })
    
}   
Employee(); 


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
      




// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



// Employee.prototype.engineer = function(){};
// Employee.prototype.intern = function(){};
// Employee.prototype.manager = function(){};

module.exports = Employee;