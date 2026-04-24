import Breadcrumb from "../../Breadcrumb";
import "../../transactions/TransactionForm/TransactionForm.scss";

export default function TransactionForm({
  handleSubmit,
  title,
  setTitle,
  amount,
  setAmount,
  type,
  setType,
  date,
  setDate,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div>
      <form className="add-transaction-form" onSubmit={handleSubmit}>
        <h1 className="page-title-sm">Trasaction Details</h1>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          className="input title-input"
          type="text"
          placeholder="Enter title(e.g. Grocery Shopping)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor="amount">Amount</label>
        <div className="amount-input-fields">
          <input type="button" className="amount-sign-btn" value="$" />
          <input
            id="amount"
            className="input amount-input"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            <button
              type="button"
              onClick={() => setType("income")}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: type === "income" ? "#d4edda" : "#f0f0f0",
                color: type === "income" ? "#155724" : "#666",
                cursor: "pointer",
                fontWeight: type === "income" ? "bold" : "normal",
              }}
            >
              Income
            </button>

            <button
              type="button"
              onClick={() => setType("expense")}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: type === "expense" ? "#f8d7da" : "#f0f0f0",
                color: type === "expense" ? "#721c24" : "#666",
                cursor: "pointer",
                fontWeight: type === "expense" ? "bold" : "normal",
              }}
            >
              Expense
            </button>
          </div>
        </div>

        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>

        <label htmlFor="date">Date</label>
        <input
          id="date"
          className="input"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <button className="add-amount-btn">Add Transaction</button>
      </form>
    </div>
  );
}
