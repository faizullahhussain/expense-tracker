import TransactionSummary from "../components/transactions/TransactionSummary/TransactionSummary";
import TransactionList from "../components/transactions/TransactionList/TransactionList";
import Breadcrumb from "../components/Breadcrumb";
import Charts from "../components/analytics/Charts";
import "./Analytics.scss";

export default function Analytics({ transactions, handleDelete, handleEdit }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <section className="container">
      <h1 className="page-title">Analytics</h1>
      <Breadcrumb />

      <TransactionSummary
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <div className="charts">
        <h2 className="page-title-sm">Charts</h2>
        <Charts transactions={transactions} />
      </div>

      <div className="recent-transaction">
        <h2 className="page-title-sm">Recent Transactions</h2>
        <TransactionList
          transactions={transactions}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </section>
  );
}
