import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <TransactionForm />
      <TransactionList />
    </div>
  );
}
