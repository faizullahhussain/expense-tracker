import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../src/components/layout/Header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import TransactionsDetails from "./pages/TransactionsDetails";

function App() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
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
