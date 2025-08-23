import { createSlice, createSelector } from "@reduxjs/toolkit";

// Load existing transactions from localStorage (if any)
const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

const initialState = {
  items: savedTransactions,
  // 🔽 global filters (shared by table & charts)
  filters: {
    search: "",                 // text search on description
    type: "all",                // "all" | "income" | "expense"
    category: "all",            // "all" | category value
    startDate: null,            // ISO string or null
    endDate: null,              // ISO string or null
    minAmount: null,            // number or null
    maxAmount: null,            // number or null
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // CRUD
    addTransaction: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((tx) => tx.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },
    updateTransaction: (state, action) => {
      const { id, changes } = action.payload;
      const idx = state.items.findIndex((tx) => tx.id === id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...changes };
      localStorage.setItem("transactions", JSON.stringify(state.items));
    },

    // 🔽 filter actions
    setSearch: (state, action) => {
      state.filters.search = action.payload ?? "";
    },
    setTypeFilter: (state, action) => {
      state.filters.type = action.payload ?? "all";
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload ?? "all";
    },
    setDateRange: (state, action) => {
      const { startDate = null, endDate = null } = action.payload || {};
      state.filters.startDate = startDate;
      state.filters.endDate = endDate;
    },
    setAmountRange: (state, action) => {
      const { min = null, max = null } = action.payload || {};
      state.filters.minAmount = min === "" ? null : min;
      state.filters.maxAmount = max === "" ? null : max;
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  setSearch,
  setTypeFilter,
  setCategoryFilter,
  setDateRange,
  setAmountRange,
  resetFilters,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;


// Basic selectors
export const selectTransactions = (state) => state.transactions.items;
export const selectFilters = (state) => state.transactions.filters;

// Memoized: apply all filters to items
export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectFilters],
  (items, filters) => {
    const {
      search,
      type,
      category,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    } = filters;

    const s = (search || "").trim().toLowerCase();
    const sd = startDate ? new Date(startDate) : null;
    const ed = endDate ? new Date(endDate) : null;

    return items.filter((tx) => {
      // description/text match
      const desc = (tx.description || "").toLowerCase();
      if (s && !desc.includes(s)) return false;

      // type match
      if (type !== "all" && tx.type !== type) return false;

      // category match
      if (category !== "all" && tx.category !== category) return false;

      // date range match
      if (sd || ed) {
        const txDate = new Date(tx.date);
        if (sd && txDate < sd) return false;
        if (ed && txDate > ed) return false;
      }

      // amount range match
      if (minAmount != null && Number(tx.amount) < Number(minAmount)) return false;
      if (maxAmount != null && Number(tx.amount) > Number(maxAmount)) return false;

      return true;
    });
  }
);

// Totals for ALL transactions (unfiltered)
export const selectTotals = createSelector([selectTransactions], (items) => {
  const totals = items.reduce(
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
    balance: totals.income - totals.expense,
  };
});

// Totals for FILTERED transactions (useful for charts)
export const selectTotalsFiltered = createSelector(
  [selectFilteredTransactions],
  (items) => {
    const totals = items.reduce(
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
      balance: totals.income - totals.expense,
    };
  }
);
