import { createSlice } from "@reduxjs/toolkit";

// Each transaction: { id, description, amount, type: 'income'|'expense', category, date }
const initialState = [];

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // Why push? RTK uses Immer under the hood, so "mutations" are safe and become immutable updates.
      state.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      // Why filter? Easy to create a new list without the deleted item.
      return state.filter(tx => tx.id !== action.payload);
    },
    // Optional for later:
    updateTransaction: (state, action) => {
      const { id, changes } = action.payload;
      const idx = state.findIndex(tx => tx.id === id);
      if (idx !== -1) state[idx] = { ...state[idx], ...changes };
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionsSlice.actions;

// Selectors — Why? Centralized reusable calculations keep components clean.
export const selectTransactions = (state) => state.transactions;
export const selectTotals = (state) => {
  const totals = state.transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.income += tx.amount;
      else acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );
  return { 
    income: totals.income, 
    expense: totals.expense, 
    balance: totals.income - totals.expense 
  };
};

export default transactionsSlice.reducer;
