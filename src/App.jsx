import './App.css';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import DashboardOverview from './features/dashboard/DashboardOverview';
import TransactionList from './features/transactions/TransactionList';
import AddTransactionForm from './features/transactions/AddTransactionForm';
import BudgetManager from './features/budget/BudgetManager';
import ReportsView from './features/reports/ReportsView';
import SettingsView from './features/settings/SettingsView.jsx';
import GoalsView from './features/goals/GoalsView.jsx'; // Add import for GoalsView
import { useState } from 'react';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  // Render page titles and content based on activeView
  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'transactions': return 'Transactions';
      case 'budgets': return 'Budget Management';
      case 'goals': return 'Financial Goals'; // Added title for Goals
      case 'reports': return 'Reports';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  // Render content based on activeView
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <div className="dashboard-grid">
              <DashboardOverview />
            </div>
            <div className="transaction-section">
              <Card 
                title="Recent Transactions" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                }
                actionElement={
                  <button 
                    className="btn" 
                    onClick={() => setActiveView('transactions')}
                  >
                    View All
                  </button>
                }
                variant="primary"
              >
                <TransactionList limit={5} showFilters={false} /> {/* Limit recent transactions */}
              </Card>
              <Card 
                title="Add New Transaction"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                }
                variant="success"
              >
                <AddTransactionForm />
              </Card>
            </div>
          </>
        );
      case 'transactions':
        return (
          <div className="transaction-page">
            <Card 
              title="Transaction History" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              }
              variant="primary"
            >
              <TransactionList showFilters={true} /> {/* Show filters on this page */}
            </Card>
            <Card 
              title="Add New Transaction"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              }
              variant="success"
            >
              <AddTransactionForm />
            </Card>
          </div>
        );
      case 'budgets':
        return (
          <Card 
            title="Budget Management" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            }
            variant="warning"
          >
            <BudgetManager />
          </Card>
        );
      case 'goals': // Add case for goals
        return <GoalsView />; 
      case 'reports':
        return <ReportsView />; 
      case 'settings':
        return <SettingsView />; 
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle()}</h1>
          <div className="page-actions">
            {/* Page-specific action buttons can go here */}
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;