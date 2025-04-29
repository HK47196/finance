import React, { useState } from 'react';
import './AddTransactionForm.css';
import { useFinance } from '../../contexts/FinanceContext';

function AddTransactionForm() {
  const { addTransaction, categories } = useFinance();
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD format
  const [transactionType, setTransactionType] = useState('expense');

  const onSubmit = e => {
    e.preventDefault();

    if (!text.trim() || !amount.trim()) {
      alert('Please add a description and amount');
      return;
    }

    const parsedAmount = parseFloat(amount);
    
    addTransaction({
      text,
      // Convert amount to number and make it negative if expense
      amount: transactionType === 'income' ? Math.abs(parsedAmount) : -Math.abs(parsedAmount),
      category,
      date
    });

    // Reset form
    setText('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  // Filter categories based on selected transaction type
  const filteredCategories = categories.filter(cat => 
    transactionType === 'income' ? cat.type === 'income' : cat.type === 'expense'
  );

  return (
    <div className="add-transaction">
      <form onSubmit={onSubmit}>
        <div className="transaction-type-selector">
          <div className={`type-option ${transactionType === 'expense' ? 'active' : ''}`}>
            <input 
              type="radio" 
              id="expense" 
              name="transactionType" 
              value="expense" 
              checked={transactionType === 'expense'}
              onChange={() => setTransactionType('expense')}
              className="visually-hidden"
            />
            <label htmlFor="expense">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z"/>
              </svg>
              Expense
            </label>
          </div>
          <div className={`type-option ${transactionType === 'income' ? 'active' : ''}`}>
            <input 
              type="radio" 
              id="income" 
              name="transactionType" 
              value="income" 
              checked={transactionType === 'income'}
              onChange={() => setTransactionType('income')}
              className="visually-hidden"
            />
            <label htmlFor="income">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
              </svg>
              Income
            </label>
          </div>
        </div>
        
        <div className="form-fields">
          <div className="form-control">
            <label htmlFor="text">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
              </svg>
              Description
            </label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What was this transaction for?"
              required
            />
          </div>
          
          <div className="form-control">
            <label htmlFor="amount">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
              Amount
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
              {filteredCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button className={`btn ${transactionType === 'income' ? 'btn-success' : 'btn-danger'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add {transactionType === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
