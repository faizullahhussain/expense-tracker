import { useState } from "react";
import TransactionList from "../components/transactions/TransactionList/TransactionList";
import ExportModal from "../components/common/ExportModal/ExportModal";
import Breadcrumb from "../components/Breadcrumb";

export default function TransactionsDetails({
  transactions,
  handleDelete,
  handleEdit,
}) {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div>
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="page-title">Transactions History</h1>
        <button
          className="export-btn-header"
          onClick={() => setShowExportModal(true)}
          style={{
            padding: "10px 16px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          📥 Export
        </button>
      </div>
      <Breadcrumb />
      <TransactionList
        transactions={transactions}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {showExportModal && (
        <ExportModal
          transactions={transactions}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
