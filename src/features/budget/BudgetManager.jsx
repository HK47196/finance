import React, { useState } from 'react';
import './BudgetManager.css';
import { useFinance } from '../../contexts/FinanceContext';
import BudgetProgress from './BudgetProgress';
import { formatCurrency } from '../../utils/dateUtils';

function BudgetManager() {
  const { budgets, addBudget, deleteBudget, categories } = useFinance();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (!name.trim() || !amount.trim() || !category) {
      alert('Please fill in all fields');
      return;
    }

    addBudget({
      name,
      amount: parseFloat(amount),
      category,
    });

    // Reset form
    setName('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="budget-manager">
      <div className="budget-section">
        <div className="budget-header">
          <h3>Current Budgets</h3>
          <div className="budget-count">
            <span>{budgets.length}</span>
          </div>
        </div>

        {budgets.length > 0 ? (
          <div className="budget-grid">
            {budgets.map(budget => {
              const category = categories.find(cat => cat.id === budget.category);
              return (
                <div key={budget.id} className="budget-card">
                  <div className="budget-card-header">
                    <h4>{budget.name}</h4>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteBudget(budget.id)}
                      aria-label="Delete budget"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
                      </svg>
                    </button>
                  </div>
                  
                  {category && <div className="budget-category">{category.name}</div>}
                  
                  <div className="budget-amount-wrapper">
                    <div className="budget-amount">
                      <span>Budget: {formatCurrency(budget.amount)}</span>
                    </div>
                    <div className="budget-spent">
                      <span>Spent: {formatCurrency(budget.spent || 0)}</span>
                    </div>
                  </div>
                  
                  <BudgetProgress budget={budget} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-budgets">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <p className="empty-message">No budgets created yet</p>
            <p className="empty-description">Create a budget below to start tracking your spending</p>
          </div>
        )}
      </div>

      <div className="add-budget-section">
        <h3>Create New Budget</h3>
        <form onSubmit={onSubmit} className="add-budget-form">
          <div className="form-control">
            <label htmlFor="name">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
              </svg>
              Budget Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Groceries Budget"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
              Budget Amount
            </label>
            <div className="amount-input">
              <span className="currency-symbol">$</span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="category">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
              </svg>
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="select-input"
            >
              <option value="">Select a category</option>
              {categories
                .filter(cat => cat.type === 'expense') // Only show expense categories
                .map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              }
            </select>
          </div>

          <button className="btn btn-warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Create Budget
          </button>
        </form>
      </div>
    </div>
  );
}

export default BudgetManager;