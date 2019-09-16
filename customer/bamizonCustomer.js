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
            const table = new Table({
                head: ['ITEM ID', 'PRODUCT NAME', 'PRICE', 'QTY IN STOCK']
                , colWidths: [9, 15, 8, 15]
            });

            connection.query(`SELECT * FROM products`, (err, res, field) => {
                if (err) throw err;
                console.log("==============================");
                res.forEach((element) => {
                    table.push([
                        element.item_id,
                        element.product_name,
                        `$${element.price}`,
                        element.stock_qty
                    ]);
                });
                console.log(table.toString());
                customer();
            });
            customer();
        } else {
            console.log("coming soon");
        };
    })
}

// table is an Array, so you can `push`, `unshift`, `splice` and friends
// table.push(
//     ['First value', 'Second value']
//     , ['First value', 'Second value']
// );
// const viewTable = () => {
//     console.log(table.toString());
// }

module.exports = customer;