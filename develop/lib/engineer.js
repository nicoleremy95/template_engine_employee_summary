// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./employee")

class Engineer extends Employee {
    constructor(name, iD, email, gitHub){
        super(name, iD, email)
        this.github = gitHub
    }
    // getRole(){

    // }
    // getGitHub(){

    // }
}
// Engineer.prototype.getGitHub = function () {};
// Engineer.prototype.getRole = function() {};
// Engineer.prototype.username =  function (){};

module.exports = Engineer;