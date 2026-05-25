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
                <td>{data.title}</td>

                {/* Category */}
                <td>{data.category}</td>

                {/* Type */}
                <td>
                  <span className={`type-badge ${data.type}`}>{data.type}</span>
                </td>

                {/* Amount */}
                <td className={`amount ${data.type}`}>${data.amount}</td>

                {/* Date */}
                <td>{data.date}</td>

                {/* Action */}
                <td>
                  <>
                    <FaEdit
                      onClick={(e) => {
                        // start editing
                        handleEditStart(data);
                      }}
                      className="edit-task-btn"
                    />

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(data.id)}
                    >
                      ✕
                    </button>
                  </>
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

      {/* Edit Modal */}
      {editId !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-title">Edit Transaction</h2>

            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  className="input edit-input"
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    className="input edit-input"
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({ ...editData, amount: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      className={`type-toggle ${editData.type === "income" ? "active-income" : ""}`}
                      onClick={() =>
                        setEditData({ ...editData, type: "income" })
                      }
                    >
                      Income
                    </button>
                    <button
                      type="button"
                      className={`type-toggle ${editData.type === "expense" ? "active-expense" : ""}`}
                      onClick={() =>
                        setEditData({ ...editData, type: "expense" })
                      }
                    >
                      Expense
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  className="input edit-input"
                  type="text"
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  className="input edit-input"
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="save-btn"
                onClick={() => handleEditSave(editId)}
              >
                Save changes
              </button>
              <button className="cancel-btn" onClick={handleEditCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
