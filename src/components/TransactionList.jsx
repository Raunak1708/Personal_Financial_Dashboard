import { useSelector, useDispatch } from "react-redux";
import { selectFilteredTransactions, deleteTransaction } from "../features/transactions/transactionSlice";
import { format } from "date-fns";

export default function TransactionList() {
  const transactions = useSelector(selectFilteredTransactions);
  const dispatch = useDispatch();

  if (transactions.length === 0) {
    return <p className="text-gray-500 mt-4">No transactions yet.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t text-sm">
                <td className="px-4 py-2">{format(new Date(tx.date), "dd/MM/yyyy")}</td>
                <td className="px-4 py-2">{tx.description}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type}
                </td>
                <td class="px-4 py-2">{tx.category}</td>
                <td className="px-4 py-2">₹{tx.amount}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => dispatch(deleteTransaction(tx.id))}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
