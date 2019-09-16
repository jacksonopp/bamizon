const colors = require("colors");

const config = {
    //mode select for main screen
    modeSelect: {
        type: "list",
        name: "mode",
        message: "Are you a customer or manager?".green,
        choices: [
            "Customer".yellow,
            "Manager".yellow,
            "Exit".red
        ]
    },
    //mode select for customer screen
    customer:
    {
        type: "list",
        name: "mode",
        message: "What would you like to do?".green,
        choices: [
            "View inventory".yellow,
            "Purchase an Item".yellow,
            "Exit".red
        ]
    },
    purchase: [
        {
            name: "itemID",
            message: "Please enter the itemID you wish to purchase".green
        }, {
            name: "qty",
            message: "How many would you like to purchase?".green
        }
    ],
    manager: {
        type: "list",
        name: "mode",
        message: "What would you like to do?",
        choices: [
            "View inventory".yellow,
            "View low inventory".yellow,
            "Add to inventory".yellow,
            "Add new product".yellow,
            "Exit".red
        ]
    }
}

module.exports = config;