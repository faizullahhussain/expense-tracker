import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AddTransaction from "./pages/AddTransaction";
import TransactionsDetails from "./pages/TransactionsDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  const defaultTransactions = [
    {
      id: 1,
      title: "Freelance Project",
      type: "income",
      amount: 2500,
      category: "Others",
      date: "2026-04-15",
    },
    {
      id: 2,
      title: "Electricity Bill",
      type: "expense",
      amount: 1200,
      category: "Bills",
      date: "2026-04-01",
    },
    {
      id: 3,
      title: "Grocery Shopping",
      type: "expense",
      amount: 150,
      category: "Shopping",
      date: "2026-04-18",
    },
  ];

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const initialValue = saved ? JSON.parse(saved) : defaultTransactions;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // add a new transaction
  const addTransaction = newTransaction => {
    setTransactions(prev => [...prev, newTransaction]);
    navigate("/TransactionsDetails");
  };

  // delete a transaction
  const handleDelete = id => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <main>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions}
                  handleDelete={handleDelete}
                />
              }
            />
            <Route
              path="/addTransaction"
              element={<AddTransaction addTransaction={addTransaction} />}
            />
            <Route
              path="/TransactionsDetails"
              element={
                <TransactionsDetails
                  transactions={transactions}
                  handleDelete={handleDelete}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
