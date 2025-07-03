const Customer = require("../models/Customer");

exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

exports.createCustomer = async (req, res) => {
  console.log("Creating customer with data:", req.body);
  const newCustomer = new Customer(req.body);
  await newCustomer.save();
  res.status(201).json(newCustomer);
};

exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
