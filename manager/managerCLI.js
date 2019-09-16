//npm dependencies
const mysql = require("mysql");
const inq = require("inquirer");
const colors = require("colors");
const Table = require("cli-table");
const validator = require("validator");

//configs
const sqlConfig = require("../config/sqlConfig");
const inqConfig = require("../config/inqConfig");

//creating and connecting to db
const connection = mysql.createConnection(sqlConfig)
connection.connect();


const manager = () => {
    inq.prompt(inqConfig.manager).then((answers) => {
        const mode = answers.mode;
        switch (mode) {
            case inqConfig.manager.choices[0]:
                viewInventory();
                break;
            case inqConfig.manager.choices[1]:
                viewLowInventory();
                break;
            case inqConfig.manager.choices[2]:
                addToInventory();
                break;
            case inqConfig.manager.choices[3]:
                addNewProduct();
                break;
            case inqConfig.manager.choices[4]:
                connection.end();
                break;

        }

    })
}

const viewInventory = () => {

    //creating an instance of a table
    const table = new Table({
        head: ['ITEM ID', 'PRODUCT NAME', 'PRICE', 'QTY IN STOCK']
        , colWidths: [9, 15, 8, 15]
    });

    //making the sql query
    connection.query(`SELECT * FROM products`, (err, res, field) => {
        if (err) throw err;
        console.log("==============================");
        res.forEach((element) => {
            //adding the elements to the table
            table.push([
                element.item_id,
                element.product_name,
                `$${element.price}`,
                element.stock_qty
            ]);
        });
        console.log(table.toString());
        manager();
    })

}
const viewLowInventory = () => {
    console.log("View Low Inventory coming soon...");
}
const addToInventory = () => {
    console.log("Add To Inventory coming soon...");
}
const addNewProduct = () => {
    console.log("Add New Product coming soon...");
}


module.exports = manager;