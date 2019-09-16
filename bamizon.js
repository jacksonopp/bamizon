//npm dependencies
const mysql = require("mysql");
const inq = require("inquirer");
const colors = require("colors");

//configs
const sqlConfig = require("./config/sqlConfig");
const inqConfig = require("./config/inqConfig");

//internal modules
const bamizonCustomer = require("./customer/bamizonCustomer");


inq.prompt(inqConfig.modeSelect).then((answers) => {
    if (answers.mode === inqConfig.modeSelect.choices[0]) { //customer
        bamizonCustomer();
    } else if (answers.mode === inqConfig.modeSelect.choices[1]) { //manager
        console.log("manager");
    }
})
