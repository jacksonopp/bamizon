const config = {
    //mode select for main screen
    modeSelect: {
        type: "list",
        name: "mode",
        message: "Are you a customer or manager?",
        choices: [
            "Customer",
            "Manager",
            "Exit"
        ]
    },
    //mode select for customer screen
    customer:
    {
        type: "list",
        name: "mode",
        message: "What would you like to do?",
        choices: [
            "View inventory",
            "Purchase an Item"
        ]
    },
    purchase: [
        {
            name: "itemID",
            message: "Please enter the itemID you wish to purchase"
        }, {
            name: "qty",
            message: "How many would you like to purchase?"
        }
    ]
}

module.exports = config;