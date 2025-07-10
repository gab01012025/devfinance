const Transaction = require("../models/transaction");

const createTransaction = async (req, res) => {
  try {
    const { type, amount, description, category } = req.body;

    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      description,
      category,
      user: req.user.id,
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction
};
