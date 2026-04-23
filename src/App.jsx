import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AddTransaction from "./pages/AddTransaction";
import TransactionsDetails from "./pages/TransactionsDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const initialValue = saved ? JSON.parse(saved) : [];

    if (initialValue.length === 0) {
      return [
        {
          id: Date.now() + 1,
          title: "Freelance Project",
          type: "income",
          amount: 2500,
          date: "2026-04-15",
        },
        {
          id: Date.now() + 2,
          title: "Monthly Rent",
          type: "expense",
          amount: 1200,
          date: "2026-04-01",
        },
        {
          id: Date.now() + 3,
          title: "Grocery Shopping",
          type: "expense",
          amount: 150,
          date: "2026-04-18",
        },
      ];
    }

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
