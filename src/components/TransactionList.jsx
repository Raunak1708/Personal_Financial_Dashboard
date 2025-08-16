import { useSelector, useDispatch } from "react-redux";
import { selectTransactions, deleteTransaction, selectTotals } from "../features/transactions/transactionSlice.js";
import { format, parseISO } from "date-fns";

export default function TransactionList() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const totals = useSelector(selectTotals); // income, expense, balance

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-green-50 rounded-xl p-3">
          <div className="text-sm text-gray-500">Income</div>
          <div className="text-xl font-semibold">₹{totals.income.toFixed(2)}</div>
        </div>
        <div className="bg-red-50 rounded-xl p-3">
          <div className="text-sm text-gray-500">Expenses</div>
          <div className="text-xl font-semibold">₹{totals.expense.toFixed(2)}</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="text-sm text-gray-500">Balance</div>
          <div className="text-xl font-semibold">₹{totals.balance.toFixed(2)}</div>
        </div>
      </div>

      {/* List */}
      <ul className="divide-y">
        {transactions.length === 0 && (
          <li className="py-6 text-center text-gray-500">No transactions yet. Add your first one!</li>
        )}

        {transactions.map((tx) => {
          const sign = tx.type === "income" ? "+" : "-";
          const color = tx.type === "income" ? "text-green-700" : "text-red-700";
          const dateLabel = (() => {
            // stored as "yyyy-MM-dd" -> show readable
            try {
              return format(parseISO(tx.date), "dd MMM yyyy");
            } catch {
              return tx.date;
            }
          })();

          return (
            <li key={tx.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{tx.description}</div>
                <div className="text-xs text-gray-500">{tx.category} • {dateLabel}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className={`font-semibold ${color}`}>
                  {sign}₹{tx.amount.toFixed(2)}
                </div>
                <button
                  onClick={() => dispatch(deleteTransaction(tx.id))}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg"
                  aria-label="Delete transaction"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
