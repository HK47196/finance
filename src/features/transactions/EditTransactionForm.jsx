import React, { useState, useEffect } from 'react';
import './AddTransactionForm.css'; // Reuse the AddTransactionForm styling
import { useFinance } from '../../contexts/FinanceContext';

function EditTransactionForm({ transaction, onClose }) {
  const { editTransaction, categories } = useFinance();
  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(Math.abs(transaction.amount).toString());
  const [category, setCategory] = useState(transaction.category || '');
  const [date, setDate] = useState(transaction.date.slice(0, 10)); // YYYY-MM-DD format
  const [transactionType, setTransactionType] = useState(transaction.amount >= 0 ? 'income' : 'expense');

  useEffect(() => {
    // Update form when transaction changes
    setText(transaction.text);
    setAmount(Math.abs(transaction.amount).toString());
    setCategory(transaction.category || '');
    setDate(transaction.date.slice(0, 10));
    setTransactionType(transaction.amount >= 0 ? 'income' : 'expense');
  }, [transaction]);

  const onSubmit = e => {
    e.preventDefault();

    if (!text.trim() || !amount.trim()) {
      alert('Please add a description and amount');
      return;
    }

    const parsedAmount = parseFloat(amount);
    
    const updatedTransaction = {
      ...transaction,
      text,
      // Convert amount to number and make it negative if expense
      amount: transactionType === 'income' ? Math.abs(parsedAmount) : -Math.abs(parsedAmount),
      category,
      date
    };

    editTransaction(transaction.id, updatedTransaction);
    onClose();
  };

  // Filter categories based on selected transaction type
  const filteredCategories = categories.filter(cat => 
    transactionType === 'income' ? cat.type === 'income' : cat.type === 'expense'
  );

  return (
    <div className="edit-transaction">
      <form onSubmit={onSubmit}>
        <div className="transaction-type-selector">
          <div className={`type-option ${transactionType === 'expense' ? 'active' : ''}`}>
            <input 
              type="radio" 
              id="expense-edit" 
              name="transactionTypeEdit" 
              value="expense" 
              checked={transactionType === 'expense'}
              onChange={() => setTransactionType('expense')}
              className="visually-hidden"
            />
            <label htmlFor="expense-edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z"/>
              </svg>
              Expense
            </label>
          </div>
          <div className={`type-option ${transactionType === 'income' ? 'active' : ''}`}>
            <input 
              type="radio" 
              id="income-edit" 
              name="transactionTypeEdit" 
              value="income" 
              checked={transactionType === 'income'}
              onChange={() => setTransactionType('income')}
              className="visually-hidden"
            />
            <label htmlFor="income-edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
              </svg>
              Income
            </label>
          </div>
        </div>
        
        <div className="form-fields">
          <div className="form-control">
            <label htmlFor="text-edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
              </svg>
              Description
            </label>
            <input
              id="text-edit"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What was this transaction for?"
              required
            />
          </div>
          
          <div className="form-control">
            <label htmlFor="amount-edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
              Amount
            </label>
            <div className="amount-input">
              <span className="currency-symbol">$</span>
              <input
                id="amount-edit"
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
            <label htmlFor="category-edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"/>
              </svg>
              Category
            </label>
            <select
              id="category-edit"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="select-input"
            >
              <option value="">Select a category</option>
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="date-edit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Date
            </label>
            <input
              id="date-edit"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={`btn ${transactionType === 'income' ? 'btn-success' : 'btn-danger'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </svg>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTransactionForm;