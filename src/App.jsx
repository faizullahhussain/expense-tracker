import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import AddTransaction from "./pages/AddTransaction";
import TransactionsDetails from "./pages/TransactionsDetails";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

function App() {
  const defaultTransactions = [
    {
      id: 1,
      title: "Freelance Project",
      type: "income",
      amount: 2500,
      category: "Others",
      date: "2026-04-15",
      tags: ["work"],
      isRecurring: false,
    },
    {
      id: 2,
      title: "Electricity Bill",
      type: "expense",
      amount: 1200,
      category: "Bills",
      date: "2026-04-01",
      tags: ["utilities"],
      isRecurring: true,
      recurringFrequency: "monthly",
      recurringEndDate: "2026-12-31",
    },
    {
      id: 3,
      title: "Grocery Shopping",
      type: "expense",
      amount: 150,
      category: "Shopping",
      date: "2026-04-18",
      tags: ["food"],
      isRecurring: false,
    },
  ];

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const initialValue = saved ? JSON.parse(saved) : defaultTransactions;
    return initialValue;
  });

  // Generate recurring transactions
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const updated = transactions.map((t) => {
      if (t.isRecurring && t.lastGenerated !== today) {
        const nextDate = generateNextDate(t.date, t.recurringFrequency);
        if (
          nextDate <= today &&
          (!t.recurringEndDate || nextDate <= t.recurringEndDate)
        ) {
          return { ...t, lastGenerated: today };
        }
      }
      return t;
    });

    if (JSON.stringify(updated) !== JSON.stringify(transactions)) {
      setTransactions(updated);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Helper function to generate next recurring date
  const generateNextDate = (currentDate, frequency) => {
    const date = new Date(currentDate);
    switch (frequency) {
      case "daily":
        date.setDate(date.getDate() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      default:
        break;
    }
    return date.toISOString().split("T")[0];
  };

  // add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
    navigate("/TransactionsDetails");
  };

  // delete a transaction
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // edit transaction
  const handleEdit = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, ...updatedTransaction } : t,
      ),
    );
  };

  return (
    <ThemeProvider>
      <main>
        <div className="layout">
          <Sidebar />
          <div className="content">
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                }
              />
              <Route
                path="/analytics"
                element={
                  <Analytics
                    transactions={transactions}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    transactions={transactions}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
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
                    handleEdit={handleEdit}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
