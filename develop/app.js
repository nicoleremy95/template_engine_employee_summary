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
const validator = async (input) => {
    if (input ==='') {
        console.log('Please provide a response') ;
    } else return true; 
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function managerFunc(){
    console.log("manager function");
    await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Hi Manager. What is your name?",  
            validate: validator 
        },
        {
            type: "input",
            name: "id",
            message: "what is your employee id?",
            validate: validator
        },
        {
            type: "input",
            name:"email",
            message:"what is your employee email?",
            validate: validator
        },
        {
            type: "input",
            name: "officeNumber",
            message: "what is your manager office number?",
            validate: validator
            
        }
    ]).then(function({name,id,email,officeNumber}){
        const managerCap = name.toUpperCase();
        const newManager = new Manager(managerCap, id, email, officeNumber)
        employeeArray.push(newManager);
        console.log(employeeArray)
        Employee();
    })
   
}

function Employee() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Now time to update your employees! What is your employee's role?",
            choices: [ "engineer", "intern", "Done! Make me web page please"]
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

            case "Done! Make me web page please":
                console.log("create website!")
                if(employeeArray === undefined || employeeArray.length == 0){
                    console.log("please choose an option and add employee info")
                    Employee();
                    
                }else{
                    var htmlstring = render(employeeArray);
                    console.log(htmlstring)
                    fs.writeFile(outputPath, htmlstring, function(err) {
                        if (err) {
                          return console.log(err);
                        }
                        console.log("Success! Web page made");
                      }); 
                }
                break;
        }
    })
}



async function engineerFunc(){
    console.log("engineer function");
    await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your employee name?",
            validate: validator
        },
        {
            type: "input",
            name: "id",
            message: "what is your employee id?",
            validate: validator
        },
        {
            type: "input",
            name:"email",
            message:"what is your employee email?",
            validate: validator
        },
        {
            type: "input",
            name: "github",
            message: "what is your engineer's github username?",
            validate: validator
        }
    ]).then(function({name,id,email,github}){
        const engineerCap = name.toUpperCase();
        const newEngineer = new Engineer (engineerCap, id, email, github)
        employeeArray.push(newEngineer);
        console.log(employeeArray)
        Employee();
    })
    
}

async function internFunc(){
    console.log("intern function");
    await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your employee name?",
            validate: validator
        },
        {
            type: "input",
            name: "id",
            message: "what is your employee id?",
            validate: validator
        },
        {
            type: "input",
            name:"email",
            message:"what is your employee email?",
            validate: validator
        },
        {
            type: "input",
            name: "school",
            message: "what school does your intern go to?",
            validate: validator
        }
    ]).then(function({name,id,email,school}){
        const internCap = name.toUpperCase();
        const schoolCap = school.toUpperCase();
        const newIntern = new Intern (internCap, id, email, schoolCap)
        employeeArray.push(newIntern);
        console.log(employeeArray)
        Employee();
    })
    
}   
managerFunc();


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