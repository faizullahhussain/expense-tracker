import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import "../../transactions/TransactionForm/TransactionForm.scss";

import {
  FiFileText,
  FiDollarSign,
  FiTag,
  FiCalendar,
  FiPlus,
} from "react-icons/fi";

import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

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
  const dateRef = useRef(null);

  useEffect(() => {
    if (dateRef.current) {
      flatpickr(dateRef.current, {
        dateFormat: "Y-m-d",
        defaultDate: date || null,
        onChange: (selectedDates, dateStr) => {
          setDate(dateStr);
        },
      });
    }
  }, []);

  return (
    <div>
      <form className="add-transaction-form" onSubmit={handleSubmit}>
        {/* HEADER */}
        <div className="form-header">
          <div className="header-icon">
            <FiFileText />
          </div>
          <div>
            <h1 className="form-title">Transaction Details</h1>
            <p className="form-subtitle">
              Add the details of your income or expense
            </p>
          </div>
        </div>

        {/* TITLE */}
        <div className="form-group">
          <label className="label-with-icon">
            <FiTag /> Title
          </label>
          <input
            className="input"
            type="text"
            placeholder="Enter title (e.g. Grocery Shopping)"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* AMOUNT + TYPE (ROW) */}
        <div className="amount-type-fields">
          {/* AMOUNT */}
          <div className="form-group">
            <label className="label-with-icon">
              <FiDollarSign /> Amount
            </label>

            <div className="amount-input-fields">
              <input type="button" className="amount-sign-btn" value="$" />
              <input
                className="input amount-input"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* TYPE */}
          <div className="form-group">
            <label className="label-with-icon">
              <HiOutlineSwitchHorizontal /> Type
            </label>

            <div className="type-buttons">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`type-btn ${
                  type === "income" ? "active income" : ""
                }`}
              >
                <AiOutlineArrowUp />
                Income
              </button>

              <button
                type="button"
                onClick={() => setType("expense")}
                className={`type-btn ${
                  type === "expense" ? "active expense" : ""
                }`}
              >
                <AiOutlineArrowDown />
                Expense
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label className="label-with-icon">
            <FiTag /> Category
          </label>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>

        {/* DATE */}
        <div className="form-group">
          <label className="label-with-icon">
            <FiCalendar /> Date
          </label>

          <div className="date-wrapper">
            <input ref={dateRef} className="input" placeholder="Select date" />
            <span className="calendar-icon">📅</span>
          </div>
        </div>

        {/* SUBMIT */}
        <button type="submit" className="add-amount-btn">
          <FiPlus /> Add Transaction
        </button>
      </form>
    </div>
  );
}
