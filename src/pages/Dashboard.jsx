import TransactionSummary from "../components/transactions/TransactionSummary/TransactionSummary";
import TransactionList from "../components/transactions/TransactionList/TransactionList";

export default function Dashboard({ transactions, handleDelete, handleEdit }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <section className="container">
      <h1 className="page-title">Dashboard Overview</h1>
      <TransactionSummary
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
      <div className="recent-transaction">
        <h1 className="page-title-sm">Recent Transactions</h1>
        <TransactionList
          transactions={transactions}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </section>
  );
}
