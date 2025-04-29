import React from 'react';
import './BudgetProgress.css';

function BudgetProgress({ budget }) {
  // Calculate the percentage spent
  const spent = budget.spent || 0;
  const percentage = Math.min(100, Math.round((spent / budget.amount) * 100));
  
  // Determine status color based on percentage
  let statusClass = 'success';
  if (percentage >= 90) {
    statusClass = 'danger';
  } else if (percentage >= 75) {
    statusClass = 'warning';
  }

  return (
    <div className="budget-progress">
      <div className="progress-container">
        <div 
          className={`progress-bar ${statusClass}`} 
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage >= 20 && <span className="progress-text">{percentage}%</span>}
        </div>
        {percentage < 20 && <span className="progress-text-outside">{percentage}%</span>}
      </div>
      
      <div className="budget-status">
        {percentage >= 100 ? (
          <span className="budget-warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </svg>
            Budget exceeded
          </span>
        ) : percentage >= 90 ? (
          <span className="budget-warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            Getting close
          </span>
        ) : (
          <span className="budget-remainder">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            On track
          </span>
        )}
      </div>
    </div>
  );
}

export default BudgetProgress;