import asyncHandler from 'express-async-handler';
import Expense from '../models/ExpenseModel.js';

// @desc    Get logged in user expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
  res.json(expenses);
});

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, date } = req.body;

  if (!title || !amount || !category || !date) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const expense = new Expense({
    title,
    amount,
    category,
    date,
    user: req.user._id,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
});

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error('Expense not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await expense.deleteOne();

  res.json({ id: req.params.id });
});

export { getExpenses, createExpense, deleteExpense };
