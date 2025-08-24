import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionSlice.js";
import budgetReducer from "../features/budgets/budgetsSlice.js";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budget: budgetReducer,
  },
});

export default store;
