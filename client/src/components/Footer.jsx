import { FaEnvelope, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <p>@ Expense Tracker &copy; {new Date().getFullYear()}</p>

        <p>
          Built by <span>Aksh Gupta</span>
        </p>

        <div className="footer-links">
          <a
            href="https://github.com/AkshGupta007/Expense-Tracker"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={14} /> GitHub
          </a>
          <a href="mailto:akshgupta593@gmail.com">
            <FaEnvelope size={14} /> akshgupta593@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
