import React,{use, useState} from 'react'
import {setbudget,resetBudget,selectBudgetselector} from "../features/budgets/budgetsSlice"
import {useDispatch,useSelector} from "react-redux"


function Budgets() {
    const dispatch=useDispatch();
    const {budget,spent,remain,status}=useSelector(selectBudgetselector);
    const [inputbudget,setInputbudget]=useState("");
    
    const handleSetBudget = () => {
      if (!isNaN(inputbudget) && inputbudget > 0) {
        dispatch(setbudget(inputbudget));
        setInputbudget("");
      }
    }
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Budget Tracking</h2>

      {/* Budget Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter budget (₹)"
          value={inputbudget}
          onChange={(e) => setInputbudget(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <button
          onClick={handleSetBudget}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Set
        </button>
        <button
          onClick={() => dispatch(resetBudget())}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Budget Info */}
      <div className="space-y-2">
        <p><strong>Budget:</strong> ₹{budget}</p>
        <p><strong>Spent:</strong> ₹{spent}</p>
        <p><strong>Remaining:</strong> ₹{remain}</p>
        <p>
          <strong>Status:</strong>{" "}
          {status === "safe" && <span className="text-green-600">✅ Safe</span>}
          {status === "warning" && <span className="text-yellow-600">⚠️ Warning</span>}
          {status === "overspent" && <span className="text-red-600">🔴 Overspent</span>}
        </p>
      </div>
    </div>
  );
}


export default Budgets;   
