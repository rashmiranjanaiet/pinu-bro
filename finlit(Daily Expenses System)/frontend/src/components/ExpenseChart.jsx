import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8B5CF6', '#EC4899', '#38BDF8', '#F59E0B', '#10B981', '#6366F1'];

const ExpenseChart = ({ data }) => {
  const chartData = useMemo(() => {
    const categoryTotals = data.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    
    return Object.keys(categoryTotals).map(key => ({
      name: key,
      value: categoryTotals[key],
    }));
  }, [data]);

  return (
    <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
                {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip
                contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #4B5563',
                    borderRadius: '0.5rem',
                }}
            />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
