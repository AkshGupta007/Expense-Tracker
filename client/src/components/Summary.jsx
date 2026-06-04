import { useExpenseContext } from "../context/ContextApi";
import { formatCurrency } from "../utils/formatCurrency";

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];

export default function SummaryPanel() {
  const { expenses } = useExpenseContext();

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const thisMonthExpenses = expenses.filter((e) =>
    e.date.startsWith(thisMonth),
  );
  const totalThisMonth = thisMonthExpenses.reduce(
    (sum, e) => sum + e.amount,
    0,
  );

  const totalByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return acc;
  }, {});

  const highest = expenses.reduce(
    (max, e) => (e.amount > (max?.amount || 0) ? e : max),
    null,
  );

  return (
    <div className="card">
      <h2>Summary</h2>

      <div className="summary-stat">
        <span>This Month</span>
        <strong>{formatCurrency(totalThisMonth)}</strong>
      </div>

      {highest && (
        <div className="summary-stat">
          <span>Highest Expense</span>
          <strong>{formatCurrency(highest.amount)}</strong>
        </div>
      )}

      <hr />
      <h3>By Category</h3>

      {CATEGORIES.map((cat) => (
        <div key={cat} className="summary-stat">
          <span>{cat}</span>
          <span>{formatCurrency(totalByCategory[cat])}</span>
        </div>
      ))}
    </div>
  );
}
