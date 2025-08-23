import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setTypeFilter,
  setCategoryFilter,
  setDateRange,
  setAmountRange,
  resetFilters,
  selectFilters,
} from "../features/transactions/transactionSlice";
import { CATEGORIES } from "../constants/categories";

export default function TransactionFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">

        {/* Search */}
        <input
          type="text"
          placeholder="Search description..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="border rounded-lg px-3 py-2"
        />

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => dispatch(setTypeFilter(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={filters.startDate ? filters.startDate.slice(0, 10) : ""}
          onChange={(e) =>
            dispatch(
              setDateRange({
                startDate: e.target.value ? new Date(e.target.value).toISOString() : null,
                endDate: filters.endDate,
              })
            )
          }
          className="border rounded-lg px-3 py-2"
        />

        {/* End Date */}
        <input
          type="date"
          value={filters.endDate ? filters.endDate.slice(0, 10) : ""}
          onChange={(e) =>
            dispatch(
              setDateRange({
                startDate: filters.startDate,
                endDate: e.target.value ? new Date(e.target.value).toISOString() : null,
              })
            )
          }
          className="border rounded-lg px-3 py-2"
        />

        {/* Amount Range (min / max) */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            value={filters.minAmount ?? ""}
            onChange={(e) =>
              dispatch(
                setAmountRange({
                  min: e.target.value === "" ? null : Number(e.target.value),
                  max: filters.maxAmount,
                })
              )
            }
            className="border rounded-lg px-3 py-2 w-1/2"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={filters.maxAmount ?? ""}
            onChange={(e) =>
              dispatch(
                setAmountRange({
                  min: filters.minAmount,
                  max: e.target.value === "" ? null : Number(e.target.value),
                })
              )
            }
            className="border rounded-lg px-3 py-2 w-1/2"
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={() => dispatch(resetFilters())}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
