import { FaGithub, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto py-5 px-4">
      <div className="max-w-5xl mx-auto flex  items-center gap-6">
        <p className="text-gray-500 text-sm font-medium">
          @ Expense Tracker &copy; {new Date().getFullYear()}
        </p>

        <p className="text-sm text-gray-500">
          Built by{" "}
          <span className="font-semibold text-indigo-600">Aksh Gupta</span>
        </p>

        <div className="flex items-center gap-3 mt-1">
          <a
            href="https://github.com/AkshGupta007/Expense-Tracker"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-150"
          >
            <FaGithub size={14} /> GitHub
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="mailto:akshgupta593@gmail.com"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-indigo-600 transition-colors duration-150"
          >
            <FaEnvelope size={14} /> akshgupta593@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}