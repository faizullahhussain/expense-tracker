import { useState } from "react";
import "../../transactions/TransactionList/TransactionList.scss";
import { BsFileExcel } from "react-icons/bs";
import { FaEdit, FaSearch } from "react-icons/fa";

export default function TransactionList({
  transactions,
  handleDelete,
  handleEdit,
}) {
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    type: "",
    date: "",
    category: "",
  });

  const filteredTransactions = transactions.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()),
  );

  // Start editing
  const handleEditStart = (transaction) => {
    setEditId(transaction.id);
    setEditData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
      category: transaction.category,
    });
  };

  // Save edited transaction
  const handleEditSave = (id) => {
    if (!editData.title || !editData.amount) return;

    handleEdit(id, {
      title: editData.title,
      amount: Number(editData.amount),
      type: editData.type,
      date: editData.date,
      category: editData.category,
    });

    setEditId(null);
    setEditData({ title: "", amount: "", type: "", date: "", category: "" });
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditId(null);
    setEditData({ title: "", amount: "", type: "", date: "", category: "" });
  };

  return (
    <div className="table-wrapper">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          className="input-search"
          placeholder="Search Transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((data) => (
              <tr key={data.id}>
                {/* Title */}
                <td>
                  {editId === data.id ? (
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="edit-input"
                    />
                  ) : (
                    data.title
                  )}
                </td>

                {/* Category */}
                <td>
                  {editId === data.id ? (
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="edit-input"
                    />
                  ) : (
                    data.category
                  )}
                </td>

                {/* Type */}
                <td>
                  {editId === data.id ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() =>
                          setEditData({ ...editData, type: "income" })
                        }
                        className={`type-toggle ${editData.type === "income" ? "active-income" : ""}`}
                      >
                        Income
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setEditData({ ...editData, type: "expense" })
                        }
                        className={`type-toggle ${editData.type === "expense" ? "active-expense" : ""}`}
                      >
                        Expense
                      </button>
                    </div>
                  ) : (
                    <span className={`type-badge ${data.type}`}>
                      {data.type}
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className={`amount ${data.type}`}>
                  {editId === data.id ? (
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({ ...editData, amount: e.target.value })
                      }
                      className="edit-input"
                    />
                  ) : (
                    `$${data.amount}`
                  )}
                </td>

                {/* Date */}
                <td>
                  {editId === data.id ? (
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                      className="edit-input"
                    />
                  ) : (
                    data.date
                  )}
                </td>

                {/* Action */}
                <td>
                  {editId === data.id ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="save-btn"
                        onClick={() => handleEditSave(data.id)}
                      >
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleEditCancel}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <FaEdit
                        onClick={() => handleEditStart(data)}
                        className="edit-task-btn"
                      />

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(data.id)}
                      >
                        ✕
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                No transactions found matching "{search}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
