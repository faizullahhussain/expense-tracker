import { useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm/TransactionForm";
import Breadcrumb from "../components/Breadcrumb";

export default function AddTransaction({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const categories = [
    "Food",
    "Shopping",
    "Bills",
    "Entertaintment",
    "Transport",
    "Education",
    "Others",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category: selectedCategory,
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
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </section>
  );
}
