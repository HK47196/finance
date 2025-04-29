import React from 'react';
import './RecentTransactions.css';
import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency, formatDate } from '../../utils/dateUtils';

function RecentTransactions({ limit = 5 }) {
  const { transactions, getCategoryById } = useFinance();
  
  // Get the most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  if (recentTransactions.length === 0) {
    return (
      <div className="empty-transactions">
        <div className="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
          </svg>
        </div>
        <p className="empty-message">No recent transactions</p>
        <p className="empty-description">Transactions you add will appear here</p>
      </div>
    );
  }

  return (
    <div className="recent-transactions">
      <ul>
        {recentTransactions.map(transaction => {
          // Get category if it exists
          const category = transaction.category ? 
            getCategoryById(transaction.category) : null;
          
          return (
            <li key={transaction.id} className={transaction.amount < 0 ? 'expense' : 'income'}>
              <div className="transaction-type-indicator"></div>
              <div className="transaction-content">
                <div className="transaction-info">
                  <h4 className="transaction-text">{transaction.text}</h4>
                  <div className="transaction-meta">
                    {category && <span className="transaction-category">{category.name}</span>}
                    <span className="transaction-date">{formatDate(transaction.date)}</span>
                  </div>
                </div>
                <div className="transaction-amount">
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecentTransactions;