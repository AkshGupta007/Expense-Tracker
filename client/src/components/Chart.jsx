import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useExpenseContext } from "../context/ContextApi";
import { formatCurrency } from "../utils/formatCurrency";

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Other"];
const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function CategoryChart() {
  const { expenses } = useExpenseContext();

  const data = CATEGORIES.map((cat) => ({
    name: cat,
    value: expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="card">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(val) => formatCurrency(val)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
