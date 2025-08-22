import React from "react";
import { useSelector } from "react-redux";
import { selectTotals } from "../features/transactions/transactionSlice";
import CountUp from "react-countup";

export default function SummaryCards() {
  const { income, expense, balance } = useSelector(selectTotals);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Income */}
      <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
        <h4 className="text-xl font-semibold">💰 Income</h4>
        <p className="text-2xl font-bold">
          ₹<CountUp end={income} duration={1.2} separator="," />
        </p>
      </div>

      {/* Expense */}
      <div className="bg-red-100 text-red-800 p-4 rounded-xl shadow">
        <h4 className="text-xl font-semibold">💸 Expense</h4>
        <p className="text-2xl font-bold">
          ₹<CountUp end={expense} duration={1.2} separator="," />
        </p>
      </div>

      {/* Balance */}
      <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">
        <h4 className="text-xl font-semibold">📊 Balance</h4>
        <p className="text-2xl font-bold">
          ₹<CountUp end={balance} duration={1.2} separator="," />
        </p>
      </div>
    </div>
  );
}
