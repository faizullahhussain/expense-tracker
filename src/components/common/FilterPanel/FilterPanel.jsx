import { useState } from "react";
import "./FilterPanel.scss";
import { MdClose } from "react-icons/md";

export default function FilterPanel({
  transactions,
  onFilterChange,
  categories,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    type: "all",
    selectedCategories: [],
    tags: [],
    minAmount: "",
    maxAmount: "",
  });

  const allTags = [...new Set(transactions.flatMap((t) => t.tags || []))];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category) => {
    const updated = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter((c) => c !== category)
      : [...filters.selectedCategories, category];
    handleFilterChange("selectedCategories", updated);
  };

  const handleTagToggle = (tag) => {
    const updated = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    handleFilterChange("tags", updated);
  };

  const clearFilters = () => {
    const emptyFilters = {
      dateFrom: "",
      dateTo: "",
      type: "all",
      selectedCategories: [],
      tags: [],
      minAmount: "",
      maxAmount: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(filters).filter((v) =>
    Array.isArray(v) ? v.length > 0 : v !== "" && v !== "all",
  ).length;

  return (
    <div className="filter-panel">
      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        🔍 Advanced Filters
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {showFilters && (
        <div className="filter-content">
          {/* Date Range */}
          <div className="filter-group">
            <h4>Date Range</h4>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              placeholder="From date"
              className="filter-input"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              placeholder="To date"
              className="filter-input"
            />
          </div>

          {/* Type Filter */}
          <div className="filter-group">
            <h4>Type</h4>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount Range */}
          <div className="filter-group">
            <h4>Amount Range</h4>
            <input
              type="number"
              placeholder="Min amount"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange("minAmount", e.target.value)}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Max amount"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
              className="filter-input"
            />
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="filter-group">
              <h4>Categories</h4>
              <div className="filter-checkboxes">
                {categories.map((cat) => (
                  <label key={cat} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={filters.selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="filter-group">
              <h4>Tags</h4>
              <div className="filter-tags">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-filter-btn ${
                      filters.tags.includes(tag) ? "active" : ""
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="active-filters">
              <p className="active-filters-title">Active Filters:</p>
              {filters.dateFrom && (
                <span className="filter-chip">
                  From: {filters.dateFrom}
                  <MdClose onClick={() => handleFilterChange("dateFrom", "")} />
                </span>
              )}
              {filters.dateTo && (
                <span className="filter-chip">
                  To: {filters.dateTo}
                  <MdClose onClick={() => handleFilterChange("dateTo", "")} />
                </span>
              )}
              {filters.type !== "all" && (
                <span className="filter-chip">
                  Type: {filters.type}
                  <MdClose onClick={() => handleFilterChange("type", "all")} />
                </span>
              )}
              {filters.minAmount && (
                <span className="filter-chip">
                  Min: ${filters.minAmount}
                  <MdClose
                    onClick={() => handleFilterChange("minAmount", "")}
                  />
                </span>
              )}
              {filters.maxAmount && (
                <span className="filter-chip">
                  Max: ${filters.maxAmount}
                  <MdClose
                    onClick={() => handleFilterChange("maxAmount", "")}
                  />
                </span>
              )}
              {filters.selectedCategories.map((cat) => (
                <span key={cat} className="filter-chip">
                  {cat}
                  <MdClose onClick={() => handleCategoryToggle(cat)} />
                </span>
              ))}
              {filters.tags.map((tag) => (
                <span key={tag} className="filter-chip">
                  {tag}
                  <MdClose onClick={() => handleTagToggle(tag)} />
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
