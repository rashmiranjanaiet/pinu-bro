import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseForm from '../components/ExpenseForm';
import RecentExpenses from '../components/RecentExpenses';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

const DashboardPage = () => {
    const { userInfo } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchExpenses = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/expenses', config);
            setExpenses(data);
        } catch (error) {
            toast.error('Could not fetch expenses');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const addExpense = (expense) => {
        setExpenses([expense, ...expenses]);
    };

    const removeExpense = (id) => {
        setExpenses(expenses.filter(expense => expense._id !== id));
    };
    
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 md:p-8 max-w-7xl mx-auto"
        >
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Hey, {userInfo.name}!</h1>
                    <p className="text-gray-400">Here's your expense dashboard.</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300"
                >
                    <FiPlus />
                    <span>Add Expense</span>
                </motion.button>
            </div>
            
            {isModalOpen && <ExpenseForm addExpense={addExpense} closeModal={() => setIsModalOpen(false)} />}
            
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : expenses.length === 0 ? (
                <div className="text-center py-16 bg-brand-light-dark rounded-lg">
                    <p className="text-xl">No expenses yet. Add one to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 p-6 bg-brand-light-dark rounded-2xl shadow-lg border border-gray-700"
                    >
                        <h2 className="text-2xl font-bold mb-4">Expense Chart</h2>
                        <ExpenseChart data={expenses} />
                    </motion.div>
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 bg-brand-light-dark rounded-2xl shadow-lg border border-gray-700"
                        >
                            <h2 className="text-lg font-bold text-gray-400">Total Expenses</h2>
                            <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                                ${totalExpenses.toFixed(2)}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-1 p-6 bg-brand-light-dark rounded-2xl shadow-lg border border-gray-700 flex-grow"
                        >
                            <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
                           <RecentExpenses expenses={expenses} removeExpense={removeExpense} />
                        </motion.div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default DashboardPage;
