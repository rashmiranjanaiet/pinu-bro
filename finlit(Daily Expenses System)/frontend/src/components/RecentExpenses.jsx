import React, { useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

const categoryColors = {
    Food: 'bg-red-500',
    Transport: 'bg-blue-500',
    Entertainment: 'bg-purple-500',
    Bills: 'bg-yellow-500',
    Shopping: 'bg-pink-500',
    Other: 'bg-gray-500',
};

const RecentExpenses = ({ expenses, removeExpense }) => {
    const { userInfo } = useContext(AuthContext);

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this expense?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`/api/expenses/${id}`, config);
                removeExpense(id);
                toast.success('Expense deleted!');
            } catch (error) {
                toast.error('Failed to delete expense');
            }
        }
    };

    return (
        <div className="space-y-4 h-80 overflow-y-auto pr-2">
            <AnimatePresence>
            {expenses.slice(0, 10).map((expense) => (
                <motion.div
                    key={expense._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-brand-dark rounded-lg"
                >
                    <div className="flex items-center gap-3">
                         <span className={`w-2 h-8 rounded-full ${categoryColors[expense.category] || categoryColors.Other}`}></span>
                        <div>
                            <p className="font-semibold">{expense.title}</p>
                            <p className="text-sm text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="font-bold">${expense.amount.toFixed(2)}</p>
                        <button onClick={() => handleDelete(expense._id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <FiTrash2 />
                        </button>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
    );
};

export default RecentExpenses;
