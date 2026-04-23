import { useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm/TransactionForm";
import Breadcrumb from "../components/Breadcrumb";

export default function AddTransaction({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      date: date,
    };

    addTransaction(newTransaction);

    setTitle("");
    setAmount("");
    setType("income");
  };

  return (
    <section className="container">
      <h1 className="page-title">Add Transaction</h1>
      <Breadcrumb />
      <div className="expenseForm">
        <TransactionForm
          title={title}
          setTitle={setTitle}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
          handleSubmit={handleSubmit}
          date={date}
          setDate={setDate}
        />
      </div>
    </section>
  );
}
