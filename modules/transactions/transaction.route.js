import express from "express";
import { createTransaction, getTransactionById, getTransactions, deleteTransaction, updateTransaction } from "../Transactions/Transaction.controller.js";

const transactionrouter = express.Router();

transactionrouter.post("/", createTransaction);
transactionrouter.get("/", getTransactions);
transactionrouter.get("/:id", getTransactionById);
transactionrouter.put("/:id", updateTransaction);
transactionrouter.delete("/:id", deleteTransaction);

export default transactionrouter;
