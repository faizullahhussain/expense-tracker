import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./ExportModal.scss";
import { MdClose } from "react-icons/md";

export default function ExportModal({ transactions, onClose }) {
  const [exportFormat, setExportFormat] = useState("csv");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredTransactions = transactions.filter((t) => {
    if (dateFrom && t.date < dateFrom) return false;
    if (dateTo && t.date > dateTo) return false;
    return true;
  });

  const calculateStats = () => {
    const income = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  };

  const stats = calculateStats();

  const exportToCSV = () => {
    const headers = [
      "Date",
      "Title",
      "Category",
      "Type",
      "Amount",
      "Tags",
    ];
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.title,
      t.category,
      t.type,
      t.amount,
      (t.tags || []).join(", "),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => {
      csv += row
        .map((cell) =>
          typeof cell === "string" && cell.includes(",")
            ? `"${cell}"`
            : cell
        )
        .join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `expense-tracker-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(16);
    doc.text("Expense Tracker Report", 14, 15);

    // Date range
    doc.setFontSize(10);
    const dateRange = dateFrom || dateTo
      ? ` (${dateFrom || "Start"} to ${dateTo || "End"})`
      : "";
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}${dateRange}`, 14, 25);

    // Summary Stats
    doc.setFontSize(12);
    doc.text("Summary", 14, 35);

    doc.setFontSize(10);
    doc.text(`Total Income: $${stats.income.toFixed(2)}`, 14, 42);
    doc.text(`Total Expenses: $${stats.expense.toFixed(2)}`, 14, 49);
    const balanceColor = stats.balance >= 0 ? [34, 197, 94] : [239, 68, 68];
    doc.setTextColor(...balanceColor);
    doc.text(`Balance: $${stats.balance.toFixed(2)}`, 14, 56);
    doc.setTextColor(0);

    // Transactions Table
    const tableData = filteredTransactions.map((t) => [
      t.date,
      t.title,
      t.category,
      t.type === "income" ? "+" : "-",
      `$${t.amount.toFixed(2)}`,
      (t.tags || []).join(", "),
    ]);

    autoTable(doc, {
      head: [["Date", "Title", "Category", "Type", "Amount", "Tags"]],
      body: tableData,
      startY: 65,
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        const pageCount = doc.internal.pages.length - 1;
        doc.setFontSize(9);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      },
    });

    doc.save(`expense-tracker-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const handleExport = () => {
    if (exportFormat === "csv") {
      exportToCSV();
    } else {
      exportToPDF();
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Export Transactions</h2>
          <MdClose className="close-btn" onClick={onClose} />
        </div>

        <div className="modal-body">
          {/* Format Selection */}
          <div className="form-group">
            <label>Export Format</label>
            <div className="format-options">
              <label className="radio-label">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === "csv"}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                CSV (Spreadsheet)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="pdf"
                  checked={exportFormat === "pdf"}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                PDF (Report)
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div className="form-group">
            <label>Date Range (Optional)</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="input"
              placeholder="From date"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="input"
              placeholder="To date"
            />
          </div>

          {/* Stats Preview */}
          <div className="stats-preview">
            <h3>Export Preview</h3>
            <div className="stats-row">
              <div className="stat-item">
                <label>Transactions</label>
                <p>{filteredTransactions.length}</p>
              </div>
              <div className="stat-item income">
                <label>Total Income</label>
                <p>${stats.income.toFixed(2)}</p>
              </div>
              <div className="stat-item expense">
                <label>Total Expenses</label>
                <p>${stats.expense.toFixed(2)}</p>
              </div>
              <div className={`stat-item ${stats.balance >= 0 ? "positive" : "negative"}`}>
                <label>Balance</label>
                <p>${stats.balance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="export-btn" onClick={handleExport}>
            📥 Export {exportFormat.toUpperCase()}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
