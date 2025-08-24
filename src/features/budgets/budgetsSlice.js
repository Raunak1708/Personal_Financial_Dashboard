import { createSlice } from "@reduxjs/toolkit";
import { selectTransactions } from "../transactions/transactionSlice";

const budgetSlice = createSlice({
  name: "budget",   // keep singular for clarity
  initialState: {
    amount: 0,
  },
  reducers: {
    setbudget: (state, action) => {
      state.amount = Number(action.payload);
    },
    resetBudget: (state) => {
      state.amount = 0;
    },
  },
});

export const { setbudget, resetBudget } = budgetSlice.actions;

// ✅ Selector logic
export const selectBudgetselector = (state) => {
  const budgetAmount = state.budget.amount;  // match store key
  const transactions = selectTransactions(state);

  const spent = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remain = budgetAmount - spent;

  let status = "safe";
  if (spent >= 0.8 * budgetAmount && spent <= budgetAmount) status = "warning";
  if (spent > budgetAmount) status = "overspent";

  return { budget: budgetAmount, spent, remain, status };
};

export default budgetSlice.reducer;
