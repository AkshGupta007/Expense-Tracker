import { useState } from "react";
import { useExpenseContext } from "../context/ContextApi";
import { formatCurrency } from "../utils/formatCurrency";
import ConfirmModal from "../utils/ConfirmationModal";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function ExpenseTable({ onEdit }) {
  const { expenses, loading, error, deleteExpense } = useExpenseContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  function handleDeleteClick(expense) {
    setSelectedExpense(expense);
    setModalOpen(true);
  }

  function handleConfirm() {
    deleteExpense(selectedExpense.id);
    setModalOpen(false);
    setSelectedExpense(null);
  }

  function handleCancel() {
    setModalOpen(false);
    setSelectedExpense(null);
  }

  if (loading) return <p className="loading-text">Loading expenses...</p>;
  if (error) return <p className="error-message">⚠️ {error}</p>;

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>🧾 No expenses found.</p>
        <p>Add one using the form, or adjust your filters.</p>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={modalOpen}
        message={
          selectedExpense
            ? `Delete "${selectedExpense.note || selectedExpense.category}" — ${formatCurrency(selectedExpense.amount)}?`
            : ""
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <div className="card">
        <h2>Expenses ({expenses.length})</h2>
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Note</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>
                    <span
                      className={`badge badge-${expense.category.toLowerCase()}`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td>{expense.note || "—"}</td>
                  <td className="amount">{formatCurrency(expense.amount)}</td>
                  <td>
                    <button
                      className="btn-icon"
                      onClick={() => onEdit(expense)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteClick(expense)}
                      title="Delete"
                    >
                        <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
