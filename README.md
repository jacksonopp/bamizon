# bamizon

###### Written in node.js by Jackson Oppenheim

---

### What is liriBot?

bamizon is a command line interface that allows you to, as a customer, look at a database of products, and purchase a items. As a manager, you can look at the products, add a quantity of products, add new products, and remove products.

### NPM Dependencies

-  cli-table 0.3.1
-  colors 1.3.3
-  inquirer 7.0.0
-  mysql 2.17.1
-  validator 11.1.0

### Database

The database is a mySql database running in a local MAMP server.

### Organization

```
project
│   README.md
│   package.json
│   package-lock.json
│   bamizon.js - this is the main app
│
└───node_modules
│   │   all node modules and their dependencies are here
│
└───manager
│   │   managerCLI.js - this is the command line interface for the manager portion of the app
│
└───customer
│   │   customerCLI.js - this is the command line interface for the customer portion of the app
│
└───config
│   │   inqConfig.js - this contains all of the questions that inquirer uses
│   │   sqlConfig - this contains the configuration for the mysql node module

```

### How to run the app

** First you must install the npm dependencies **

In your terminal, navigate to the project's root folder, and type:

```
npm install
```

To run the program, make sure you are still in the project's root folder and type:

```
node bamizon.js
```

The app will then give you a list. You can select an app using the arrow keys and then pressing enter.

```
? Are you a customer or manager? (Use arrow keys)
> customer
  manager
```

In our example let's chose manager. You will then be presented with a list of options:

```
? What would you like to do? (Use arrow keys)
> view inventory
  view low inventory
  add to inventory
  add new project
  remove product
  exit


```

The app will then create a sql query that performs the requested action.

### Demo Video

To see the app in action, [watch it on youtube](https://youtu.be/J0FE7Thgezc).
