const mongoose = require("mongoose");
const customer = require("./models/customer");
const Customer = require("./models/customer");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const closeConnection = () => {
  mongoose.connection.close();
};

const addCustomer = async (customer) => {
  await Customer.create(customer);
  console.info("New customer added");
  closeConnection();
};

const findCustomer = async (name) => {
  // Case insensitivity
  const search = new RegExp(name, "i");
  // Search in firstname and lastname
  const res = await Customer.find({
    $or: [
      { firstname: search },
      { lastname: search },
      { phone: search },
      { email: search },
    ],
  });
  console.info(res);
  console.info(`${res.length} matches`);
  closeConnection();
};

const updateCustomer = async (_id, customer) => {
  await Customer.update({ _id }, customer);
  console.info("Customer updated");
  closeConnection();
};

const removeCustomer = async (_id) => {
  await Customer.remove({ _id });
  console.info("Customer removed");
  closeConnection();
};

const listCustomers = async () => {
  const res = await Customer.find();
  console.info(res);
  console.info(`${res.length} customers`);
  closeConnection();
};

module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};
