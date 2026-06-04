import { CSVLink } from "react-csv";
import { useExpenseContext } from "../context/ContextApi";

export default function DownloadCSV() {
  const { expenses } = useExpenseContext();
  const csvData = expenses.map((expense) => ({
    id: expense.id,
    Amount: expense.amount,
    Category: expense.category,
    Date: expense.date,
    Note: expense.note,
  }));

  return (
    <CSVLink data={csvData} filename="expenses.csv">
      <button className="btn-secondary" type="button">
        Download CSV
      </button>
    </CSVLink>
  );
}
