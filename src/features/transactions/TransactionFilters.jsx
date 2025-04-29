import React from 'react';
import './TransactionFilters.css';
import { useFinance } from '../../contexts/FinanceContext';

function TransactionFilters({ 
  filters, 
  setFilters, 
  sortOption, 
  setSortOption 
}) {
  const { categories } = useFinance();
  
  // Handle filter changes
  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleTypeChange = (e) => {
    setFilters(prev => ({ ...prev, type: e.target.value }));
  };

  const handleDateRangeChange = (e) => {
    setFilters(prev => ({ ...prev, dateRange: e.target.value }));
  };
  
  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div className="transaction-filters">
      <div className="filter-group">
        <label htmlFor="sort-by">Sort By</label>
        <select 
          id="sort-by" 
          value={sortOption}
          onChange={handleSortChange}
          className="filter-select"
        >
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="amount-desc">Amount (Highest First)</option>
          <option value="amount-asc">Amount (Lowest First)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="type-filter">Type</label>
        <select 
          id="type-filter" 
          value={filters.type}
          onChange={handleTypeChange}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select 
          id="category-filter" 
          value={filters.category}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="date-range">Date Range</label>
        <select
          id="date-range"
          value={filters.dateRange}
          onChange={handleDateRangeChange}
          className="filter-select"
        >
          <option value="all">All Time</option>
          <option value="current-month">Current Month</option>
          <option value="last-month">Last Month</option>
          <option value="last-3-months">Last 3 Months</option>
          <option value="last-6-months">Last 6 Months</option>
          <option value="current-year">Current Year</option>
        </select>
      </div>

      <button 
        className="reset-filters-btn"
        onClick={() => {
          setFilters({
            type: 'all',
            category: '',
            dateRange: 'all'
          });
          setSortOption('date-desc');
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
        Reset
      </button>
    </div>
  );
}

export default TransactionFilters;