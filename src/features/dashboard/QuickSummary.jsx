import React from 'react';
import './QuickSummary.css';
import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency } from '../../utils/dateUtils';

function QuickSummary() {
  const { monthlyIncome, monthlyExpenses } = useFinance();

  return (
    <div className="quick-summary">
      <div className="summary-item income">
        <div className="summary-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
          </svg>
        </div>
        <div className="summary-content">
          <h3 className="summary-label">Monthly Income</h3>
          <div className="summary-amount">{formatCurrency(monthlyIncome)}</div>
        </div>
      </div>
      
      <div className="summary-item expense">
        <div className="summary-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6h-6z"/>
          </svg>
        </div>
        <div className="summary-content">
          <h3 className="summary-label">Monthly Expenses</h3>
          <div className="summary-amount">-{formatCurrency(monthlyExpenses)}</div>
        </div>
      </div>
    </div>
  );
}

export default QuickSummary;
