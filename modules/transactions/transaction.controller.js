import { Transaction } from "../../models/transaction.model.js";

export const createTransaction = async (req, res) => {
  try {
    const id = await Transaction.create(req.body);
    res.status(201).json({ message: "Transaction created", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const affectedRows = await Transaction.update(req.params.id, req.body);
    if (!affectedRows) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const affectedRows = await Transaction.delete(req.params.id);
    if (!affectedRows) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
