import React, { useMemo, useState } from 'react';
import './ReportsView.css';
import Card from '../../components/Card';
import { useFinance } from '../../contexts/FinanceContext';
import { getPreviousMonths, formatCurrency } from '../../utils/dateUtils'; // Import utilities
import ExpenseChart from './ExpenseChart'; // Import ExpenseChart component

function ReportsView() {
  const { getMonthlyTotals } = useFinance();
  const reportMonths = 6; // Number of months to show in the report
  
  // Get the last N months (e.g., ["2025-01", "2025-02", ...])
  const months = useMemo(() => getPreviousMonths(reportMonths), [reportMonths]);
  
  // State to track selected month for category breakdown
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  // Calculate totals for each month
  const monthlySummaries = useMemo(() => {
    return months.map(month => getMonthlyTotals(month));
  }, [months, getMonthlyTotals]);

  // Format month string for display (e.g., "2025-04" -> "April 2025")
  const formatMonthDisplay = (monthString) => {
    const [year, month] = monthString.split('-');
    const date = new Date(year, month - 1); // Month is 0-indexed
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="reports-view">
      <Card 
        title={`Monthly Summary (Last ${reportMonths} Months)`} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        }
      >
        <div className="report-content">
          {monthlySummaries.length > 0 ? (
            <table className="monthly-summary-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Income</th>
                  <th>Expenses</th>
                  <th>Net Change</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummaries.map(({ month, income, expenses }) => {
                  const netChange = income - expenses;
                  return (
                    <tr key={month} 
                        className={month === selectedMonth ? 'selected-month' : ''} 
                        onClick={() => setSelectedMonth(month)}>
                      <td>{formatMonthDisplay(month)}</td>
                      <td className="income">{formatCurrency(income)}</td>
                      <td className="expense">{formatCurrency(expenses)}</td>
                      <td className={netChange >= 0 ? 'positive' : 'negative'}>
                        {formatCurrency(netChange)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No data available for the selected period.</p>
          )}
        </div>
      </Card>

      <Card 
        title={`Expense Breakdown for ${formatMonthDisplay(selectedMonth)}`} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M3.5,18.49l6-6.01l4,4L22,6.92L20.59,5.51L13.5,12.59L9.5,8.59L2,16.09L3.5,18.49z"/>
          </svg>
        }
      >
        <p className="chart-instructions">
          Click on any month in the table above to view its expense breakdown.
        </p>
        <ExpenseChart month={selectedMonth} />
      </Card>
    </div>
  );
}

export default ReportsView;
