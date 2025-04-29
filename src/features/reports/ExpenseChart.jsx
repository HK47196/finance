import React, { useMemo } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import './ExpenseChart.css';

function ExpenseChart({ month }) {
  const { transactions, categories } = useFinance();

  // Calculate spending by category for the given month
  const categorySpending = useMemo(() => {
    // Filter transactions for the specified month that are expenses
    const monthTransactions = transactions.filter(t => {
      const transactionMonth = t.date.substring(0, 7); // Extract YYYY-MM from the date
      return transactionMonth === month && t.amount < 0; // Only expenses (negative amounts)
    });

    // Group expenses by category and calculate total for each
    const spendingByCategory = {};
    
    monthTransactions.forEach(transaction => {
      const categoryId = transaction.category;
      const amount = Math.abs(transaction.amount); // Convert to positive
      
      if (!spendingByCategory[categoryId]) {
        spendingByCategory[categoryId] = 0;
      }
      
      spendingByCategory[categoryId] += amount;
    });

    // Convert to array with category details
    return Object.entries(spendingByCategory).map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId) || { name: 'Uncategorized' };
      return {
        categoryId,
        categoryName: category.name,
        amount
      };
    }).sort((a, b) => b.amount - a.amount); // Sort by amount (highest first)

  }, [transactions, categories, month]);

  // Calculate total spending for percentage calculation
  const totalSpending = useMemo(() => {
    return categorySpending.reduce((total, category) => total + category.amount, 0);
  }, [categorySpending]);

  // Generate a color for each category based on its index
  const getCategoryColor = (index) => {
    // Colors array for the chart bars
    const colors = [
      '#3366CC', '#DC3912', '#FF9900', '#109618', 
      '#990099', '#0099C6', '#DD4477', '#66AA00',
      '#B82E2E', '#316395', '#994499', '#22AA99'
    ];
    return colors[index % colors.length];
  };

  if (categorySpending.length === 0) {
    return (
      <div className="empty-chart-state">
        <p>No expense data available for this month.</p>
      </div>
    );
  }

  return (
    <div className="expense-chart">
      <div className="chart-container">
        {categorySpending.map((category, index) => {
          const percentage = totalSpending ? (category.amount / totalSpending) * 100 : 0;
          return (
            <div className="chart-entry" key={category.categoryId}>
              <div className="category-label">
                <span className="category-name">{category.categoryName}</span>
                <span className="category-percentage">{percentage.toFixed(1)}%</span>
              </div>
              <div className="bar-container">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getCategoryColor(index)
                  }}
                ></div>
              </div>
              <div className="category-amount">
                ${category.amount.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpenseChart;