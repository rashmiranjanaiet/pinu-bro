import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];

const getFormattedToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


const ExpenseForm = ({ addExpense, closeModal }) => {
    const { userInfo } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [date, setDate] = useState(getFormattedToday());

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.post('/api/expenses', { title, amount, category, date }, config);
            addExpense(data);
            toast.success('Expense added!');
            closeModal();
        } catch (error) {
            toast.error('Failed to add expense');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                className="bg-brand-light-dark p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-gray-700"
            >
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Expense Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-brand-dark border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 bg-brand-dark border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 bg-brand-dark border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                     <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-brand-dark border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Add Expense
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ExpenseForm;