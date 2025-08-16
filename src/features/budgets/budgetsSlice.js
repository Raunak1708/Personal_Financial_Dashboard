import { createSlice } from "@reduxjs/toolkit";

const budgetsSlice = createSlice({
  name: "budgets",
  initialState: [],
  reducers: {
    addBudget: (state, action) => {
      state.push(action.payload);
    },
    deleteBudget: (state, action) => {
      return state.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBudget, deleteBudget } = budgetsSlice.actions;
export default budgetsSlice.reducer;
