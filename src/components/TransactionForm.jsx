import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactions/transactionSlice";

export default function TransactionForm() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    dispatch(addTransaction({
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      type
    }));

    setText("");
    setAmount("");
    setType("income");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        type="text"
        placeholder="Enter description"
        value={text}
        onChange={(e) => setText(e.target.value)}
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
      <button
        type="submit"
        className="bg-black text-white p-2 rounded"
      >
        Add
      </button>
    </form>
  );
}
