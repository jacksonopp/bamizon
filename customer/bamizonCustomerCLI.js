//npm dependencies
const mysql = require("mysql");
const inq = require("inquirer");
const colors = require("colors");
const Table = require("cli-table");

//configs
const sqlConfig = require("../config/sqlConfig");
const inqConfig = require("../config/inqConfig");

//creating and connecting to db
const connection = mysql.createConnection(sqlConfig)
connection.connect();

const customer = () => {
    inq.prompt(inqConfig.customer).then((answers) => {
        if (answers.mode === inqConfig.customer.choices[0]) { //view inventory
            displayTable();
        } else {
            purchase();
        };
    })
}
const displayTable = () => {
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
        customer();

    })
};

const purchase = () => {

}

module.exports = customer;