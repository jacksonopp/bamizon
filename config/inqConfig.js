const config = {
    //mode select for main screen
    modeSelect: {
        type: "list",
        name: "mode",
        message: "Are you a customer or manager?",
        choices: [
            "Customer",
            "Manager"
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
    }
}

module.exports = config;