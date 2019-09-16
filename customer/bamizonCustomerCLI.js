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

const customer = () => {
    inq.prompt(inqConfig.customer).then((answers) => {
        if (answers.mode === inqConfig.customer.choices[0]) { //view inventory
            displayTable();
        } else if (answers.mode === inqConfig.customer.choices[1]) {
            purchase();
        } else {
            connection.end();
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

const querySelect = `SELECT product_name, stock_qty, price FROM products WHERE item_id=`
const queryUpdate1 = `UPDATE products SET stock_qty=`
const querUpdate2 = ` WHERE item_id=`

const purchase = () => {
    inq.prompt(inqConfig.purchase).then((answers) => {

        if (validator.isInt(answers.qty) && validator.isInt(answers.itemID)) {
            connection.query(`${querySelect}${answers.itemID}`, (err, res, field) => {
                if (err) throw err;
                const itemName = res[0].product_name; //name
                const stockQty = res[0].stock_qty; //qty
                const itemPrice = res[0].price; //price
                const purchaseQty = answers.qty; //purchase qty

                const totalPrice = itemPrice * purchaseQty;
                const newQty = stockQty - purchaseQty;


                if (newQty >= 0) {
                    updateQty(newQty, answers.itemID);
                    console.log(`Your total comes out to $${totalPrice}`)
                } else if (stockQty <= 0) {
                    console.log(`Unfortunately we are out of stock of ${itemName}s.`.bgRed);
                    purchase();
                } else {
                    console.log(`We only have ${stockQty} ${itemName}s in stock and you requsted ${purchaseQty}. Please enter a new quantity.`.bgRed)
                    purchase();
                }
            })
        } else {
            console.log(`Please enter a valid order`.bgRed);
            purchase();
        }
    })
};

const updateQty = (updatedQty, itemID) => {
    connection.query(`${queryUpdate1}${updatedQty}${querUpdate2}${itemID}`, (err, res, field) => {
        if (err) throw err;
        // console.log("Success");
    });
    customer();
}
module.exports = customer;