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
                fetchInventory();
                break;
            case inqConfig.manager.choices[3]:
                newProductInfo();
                break;
            case inqConfig.manager.choices[4]:
                console.log(`Press CTRL + C to end the program`.bgRed);
                break;
        }

    })
}

const viewInventory = () => {

    //creating an instance of a table
    const table = new Table({
        head: ['ITEM ID', 'PRODUCT NAME', 'DEPARTMENT NAME', 'PRICE', 'QTY IN STOCK']
        , colWidths: [9, 15, 20, 8, 15]
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
                element.department_name,
                `$${element.price}`,
                element.stock_qty
            ]);
        });
        console.log(table.toString());
        manager();
    })

}
const viewLowInventory = () => {
    //creating an instance of a table
    const table = new Table({
        head: ['ITEM ID', 'PRODUCT NAME', 'DEPARTMENT NAME', 'PRICE', 'QTY IN STOCK']
        , colWidths: [9, 15, 20, 8, 15]
    });

    //making the sql query
    connection.query(`SELECT * FROM products WHERE stock_qty < 5`, (err, res, field) => {
        if (err) throw err;
        console.log("==============================");
        res.forEach((element) => {
            //adding the elements to the table
            table.push([
                element.item_id,
                element.product_name,
                element.department_name,
                `$${element.price}`,
                element.stock_qty
            ]);
        });
        console.log(table.toString());
        manager();
    })


}

const querySelect = `SELECT product_name, stock_qty FROM products WHERE item_id=`

const fetchInventory = () => {
    inq.prompt(inqConfig.addToInventory).then((answers) => {
        connection.query(`${querySelect}${answers.itemID}`, (err, res, field) => {
            if (err) throw err;
            const productName = res[0].product_name;
            const stockQty = res[0].stock_qty;
            const addQty = answers.qty;
            const newQty = parseInt(stockQty) + parseInt(addQty);
            addToInventory(newQty, answers.itemID, productName, addQty);
        });
    })
}

const queryUpdate1 = `UPDATE products SET stock_qty=`
const queryUpdate2 = ` WHERE item_id=`

const addToInventory = (newQty, itemID, productName, addQty) => {
    connection.query(`${queryUpdate1}${newQty}${queryUpdate2}${itemID}`, (err, res, field) => {
        if (err) throw err;
        console.log(`Success! You added ${addQty} ${productName}s. There are now ${typeof newQty} in stock`.green);
        manager();
    })
}
const newProductInfo = () => {
    inq.prompt(inqConfig.addNewProduct).then((answers) => {
        if (!validator.isFloat(answers.newPrice) || !validator.isInt(answers.newQty)) {
            console.log("Please enter a valid price or quantity");
            newProductInfo();
        } else {
            addNewProduct(
                answers.newName,
                answers.newDept,
                answers.newPrice,
                answers.newQty);
        }
    })
}

const addNewProduct = (newName, newDept, newPrice, newQty) => {
    const newNameStr = newName.toString();
    const newDeptStr = newDept.toString();
    connection.query(
        `INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (${newNameStr}, ${newDeptStr}, ${parseFloat(newPrice)}, ${parseInt(newQty)})`,
        (err, res, field) => {
            if (err) throw err;
            console.log(`Success! You added ${newName} as a new product`);
            manager();
        }
    )
}


module.exports = manager;