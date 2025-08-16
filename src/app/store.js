import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transactions/transactionSlice.js";
import budgetsReducer from "../features/budgets/budgetsSlice.js";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgets: budgetsReducer,
  },
});

export default store;
