import { CSVLink } from "react-csv";
import { useExpenseContext } from "../context/ContextApi";
export default function DownloadCSV() {
  const { expenses } = useExpenseContext();
  const csvData = expenses.map((expense) => ({
    id: expense.id,
    Amount: expense.amount,
    Category: expense.category,
    Date: expense.createdAt.split("T")[0],
  }));
  return (
    <CSVLink data={csvData} filename="expenses.csv">
      <button className="bg-pink-200   hover:bg-red-400 text-shadow-amber-200 font-bold px-8 py-4 rounded transition duration-300">
        Download CSV
      </button>
    </CSVLink>
  );
}
