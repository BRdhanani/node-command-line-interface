#! /usr/bin/env node
const program = require("commander");
const {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
} = require("./index");
const { prompt } = require("inquirer");

const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
  },
];

program.version("1.0.0").description("CLI");

// program
//   .command("add <firstname> <lastname> <phone> <email>")
//   .alias("a")
//   .description("Add a customer")
//   .action((firstname, lastname, phone, email) =>
//     addCustomer({
//       firstname,
//       lastname,
//       phone,
//       email,
//     })
//   );

program
  .command("add")
  .alias("a")
  .description("Add a customer")
  .action(() => prompt(questions).then((customer) => addCustomer(customer)));

program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

program
  .command("update <_id>")
  .alias("u")
  .description("Update a customer")
  .action((_id) =>
    prompt(questions).then((customer) => updateCustomer(_id, customer))
  );

program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a customer")
  .action((_id) => removeCustomer(_id));

program
  .command("list")
  .alias("l")
  .description("List customers")
  .action(() => listCustomers());

program.parse(process.argv);
