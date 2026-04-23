import { useState } from "react";
import "../../transactions/TransactionList/TransactionList.scss";
import { BsFileExcel } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export default function TransactionList({ transactions, handleDelete }) {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter(
    item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="table-wrapper">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          className="input-search"
          placeholder="Search Transactions"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map(data => (
            <tr key={data.id}>
              <td>{data.title}</td>

              <td>
                <span className={`type-badge ${data.type}`}>{data.type}</span>
              </td>

              <td className={`amount ${data.type}`}>${data.amount}</td>

              <td>{data.date}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(data.id)}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
