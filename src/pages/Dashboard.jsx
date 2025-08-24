import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { selectTransactions } from "../features/transactions/transactionSlice";
import { format } from "date-fns";

export default function Dashboard() {
  const transactions = useSelector(selectTransactions);

  // ---------------- Pie Chart (Category-wise spending) ----------------
  const expenses = transactions.filter((tx) => tx.type === "expense");

  const categoryTotals = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#845EC2", "#D65DB1", "#FF6F91", "#4D8076"
  ];

  // ---------------- Bar Chart (Monthly expenses trend) ----------------
  const monthlyTotals = expenses.reduce((acc, tx) => {
    const month = format(new Date(tx.date), "MMM yyyy"); // e.g. "Aug 2025"
    acc[month] = (acc[month] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const barData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    expense: total,
  }));

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ----------- Overview (left side placeholder) ----------- */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <p>Here you can show balance, income vs expense summary, etc.</p>
      </div>

      {/* ----------- Pie Chart (right side) ----------- */}
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
        {pieData.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>

      {/* ----------- Bar Chart (bottom full width) ----------- */}
      <div className="p-4 bg-white rounded-2xl shadow-md lg:col-span-2">
        <h2 className="text-xl font-bold mb-4">Monthly Expenses Trend</h2>
        {barData.length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          <BarChart width={700} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="expense" fill="#8884d8" />
          </BarChart>
        )}
      </div>
    </div>
  );
}
