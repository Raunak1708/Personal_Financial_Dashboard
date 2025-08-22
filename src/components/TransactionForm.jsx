import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactions/transactionSlice";

export default function TransactionForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category,setcategory]=useState("")
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount||!category) return;

    dispatch(addTransaction({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      date:new Date().toISOString(),
      category
    }));
    setcategory("");
    setDescription("");
    setAmount("");
    setType("income");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded"
      />
      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            value="income"
            checked={type === "income"}
            onChange={(e) => setType(e.target.value)}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            value="expense"
            checked={type === "expense"}
            onChange={(e) => setType(e.target.value)}
          />
          Expense
        </label>
      </div>
      <label className="block text-sm font-medium text-gray-700">Category</label>
<select 
  name="category"
  value={category}
  onChange={(e)=>setcategory(e.target.value)}
  required
  className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Category</option>
  <option value="salary">Salary 💼</option>
  <option value="food">Food 🍔</option>
  <option value="transport">Transport 🚕</option>
  <option value="shopping">Shopping 🛒</option>
  <option value="bills">Bills 💡</option>
  <option value="entertainment">Entertainment 🎬</option>
  <option value="other">Other 📦</option>
</select>

      <button
        type="submit"
        className="bg-black text-white p-2 rounded"
      >
        Add
      </button>
    </form>
  );
}
