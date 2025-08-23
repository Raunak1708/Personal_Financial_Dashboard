import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import SummaryCards  from "../components/SummaryCards.jsx"
import TransactionFilters from "../components/TransactionFilters";
export default function Transactions() {
  return (
    
    <div className="max-w-7xl mx-auto p-4">
      <SummaryCards/>
      <h2 className="text-2xl text-center font-bold mb-4">Transactions</h2> 
      <TransactionForm />
      <TransactionFilters/>
      <TransactionList />
    </div>
  );
}
