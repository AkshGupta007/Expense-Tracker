import { useExpenseContext } from "../context/ContextApi";


const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Other",
];
const today = new Date().toISOString().split("T")[0];

function getThisMonthRange() {
  const now = new Date();
  const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  return { startDate: start, endDate: today };
}

function getLastMonthRange() {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last = new Date(now.getFullYear(), now.getMonth(), 0);
  return {
    startDate: first.toISOString().split("T")[0],
    endDate: last.toISOString().split("T")[0],
  };
}

export default function FilterBar() {
  const { filters, setFilters } = useExpenseContext();

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function applyPreset(preset) {
    if (preset === "this-month")
      setFilters((prev) => ({ ...prev, ...getThisMonthRange() }));
    if (preset === "last-month")
      setFilters((prev) => ({ ...prev, ...getLastMonthRange() }));
    if (preset === "all")
      setFilters((prev) => ({ ...prev, startDate: "", endDate: "" }));
  }

  return (
    <div className="filter-bar card">
      <h2>Filters</h2>
      <div className="filter-row">
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>From</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            max={today}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>To</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            max={today}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="preset-buttons">
        <button className="btn-ghost" onClick={() => applyPreset("this-month")}>
          This Month
        </button>
        <button className="btn-ghost" onClick={() => applyPreset("last-month")}>
          Last Month
        </button>
        <button className="btn-ghost" onClick={() => applyPreset("all")}>
          All Time
        </button>

   
      </div>
    </div>
  );
}
