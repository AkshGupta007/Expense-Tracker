import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SummaryPanel from "./components/Summary";
import FilterBar from "./components/FilterBar";
import CategoryChart from "./components/Chart";
import "./App.css";

export default function App() {
  const [editingExpense, setEditingExpense] = useState(null);

  function handleEdit(expense) {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingExpense(null);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💸 Expense Tracker</h1>
      </header>

      <main className="app-main">
        <section className="left-panel">
          <ExpenseForm
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
            onEditDone={() => setEditingExpense(null)}
          />
          <SummaryPanel />
          <CategoryChart />
        </section>

        <section className="right-panel">
          <FilterBar />
          <ExpenseTable onEdit={handleEdit} />
        </section>
      </main>
    </div>
  );
}
