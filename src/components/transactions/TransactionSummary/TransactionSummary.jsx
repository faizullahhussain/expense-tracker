import { FaChartPie, FaPlus, FaWallet } from "react-icons/fa";
import "../../transactions/TransactionSummary/TransactionSummary.scss";

const TransactionSummary = props => {
  return (
    <div>
      <div className="stats-cards">
        <div className="card">
          <div className="card-icon">
            <FaWallet />
          </div>
          <div className="card-content">
            <p>Total Balance</p>
            <h2>${props.balance.toFixed(2)}</h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaChartPie />
          </div>
          <div className="card-content">
            <p>Monthly Income</p>
            <h2>${props.totalIncome.toFixed(2)}</h2>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaPlus />
          </div>
          <div className="card-content">
            <p>Monthly Expense</p>
            <h2>${props.totalExpense.toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
