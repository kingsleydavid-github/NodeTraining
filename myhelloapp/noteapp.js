const util = require("./util.js");
const notes = require("./src/notes.js");
const fs = require('fs');

const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.version("1.1.0");

// string validator package

console.log(validator.isEmail("andrew#$^"));
console.log(validator.isEmail("kingsley@gmail.com"));


//chalk package

console.log(chalk.green("Success !"));
console.log(chalk.red("Error !"));

// Command line args
// console.log(chalk.yellow(process.argv[4]));

//yargs
//console.log(yargs.argv);

//yargs

//customizing yargs

//add, remove, update, delete

debugger

//create add command
yargs.command({
    command : "add",
    describe : "add a note",
    builder : {
        title : {
            describe : "Note title",
            demandOption: true,
            type: "string"

        },
        body : {
            describe : "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler : function(argv){
        notes.addNote(argv.title, argv.body);
    }
}).command({
    command : "remove",
    describe : "remove a note",
    builder : {
        title : {
            describe : "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler : function(argv){
        console.log("Removing a note",  argv.title);
    }
}).argv;

console.log(yargs.argv);