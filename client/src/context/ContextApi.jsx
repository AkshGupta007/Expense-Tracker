import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { toast } from "react-toastify";

const ExpenseContext = createContext();

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: "All",
    startDate: "",
    endDate: "",
  });

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (filters.category !== "All") {
        params.append("category", filters.category);
      }

      if (filters.startDate) {
        params.append("startDate", filters.startDate);
      }

      if (filters.endDate) {
        params.append("endDate", filters.endDate);
      }

      const res = await fetch(`${API_BASE}/expenses?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await res.json();
     
      setExpenses(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const addExpense = async (formData) => {
    const res = await fetch(`${API_BASE}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error || "Failed to add expense");
      throw new Error(err.error || "Failed to add expense");
    }
    toast.success("Expense added");

    await fetchExpenses();
  };

  const updateExpense = async (id, formData) => {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error || "Failed to update expense");
      throw new Error(err.error || "Failed to update expense");
    }

    toast.success("Expense updated");
    await fetchExpenses();
  };

  const deleteExpense = async (id) => {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete expense");
      throw new Error("Failed to delete expense");
    }

    toast.success("Expense deleted");
    await fetchExpenses();
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        filters,
        setFilters,
        setLoading,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  return useContext(ExpenseContext);
}
