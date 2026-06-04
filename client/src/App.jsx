import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import SummaryPanel from "./components/Summary";
import FilterBar from "./components/FilterBar";
import CategoryChart from "./components/Chart";
import Footer from "./components/Footer";
import logo from "./Assests/logo1.png";
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
      <header className="flex items-center justify-center gap-4">
        <img src={logo} alt="Expense Tracker Logo" className="w-32 h-32" />
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </header>

      <main className="app-main">
        <section className="left-panel">
          <ExpenseForm
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
            onEditDone={() => setEditingExpense(null)}
          />

          <CategoryChart />
          <SummaryPanel />
        </section>

        <section className="right-panel">
          <FilterBar />
          <ExpenseTable onEdit={handleEdit} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
