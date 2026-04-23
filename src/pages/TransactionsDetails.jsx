import React from "react";
import TransactionList from "../components/transactions/TransactionList/TransactionList";
import Breadcrumb from "../components/Breadcrumb";
export default function TransactionsDetails({ transactions, handleDelete }) {
  return (
    <div>
      <h1 className="page-title">Transactions History</h1>
      <Breadcrumb />
      <TransactionList
        transactions={transactions}
        handleDelete={handleDelete}
      />
    </div>
  );
}
