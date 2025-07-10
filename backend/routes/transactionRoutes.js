const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  deleteTransaction
} = require("../controllers/transactionControllers");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;
