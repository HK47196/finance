import React from 'react';
import './Sidebar.css';

function Sidebar({ activeView, onViewChange }) {
  const handleNavClick = (e, view) => {
    e.preventDefault();
    onViewChange(view);
  };

  return (
    <aside className="sidebar">
      <div className="app-logo">
        <div className="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.83-3.4 8.94-7 10-3.6-1.06-7-5.17-7-10V6.3l7-3.12z"/>
            <path d="M11 7h2v8h-2zm0 10h2v2h-2z"/>
          </svg>
        </div>
        <h1>Finance</h1>
      </div>
      
      <div className="user-profile">
        <div className="avatar">
          <span>JD</span>
        </div>
        <div className="user-info">
          <h3>John Doe</h3>
          <p className="user-role">Personal Account</p>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a 
              href="#dashboard" 
              className={activeView === 'dashboard' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'dashboard')}
            >
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
              </span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a 
              href="#transactions" 
              className={activeView === 'transactions' ? 'active' : ''} 
              onClick={(e) => handleNavClick(e, 'transactions')}
            >
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 5h-3.5V7h-3v1H7V6h10v2zm-9 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                </svg>
              </span>
              <span>Transactions</span>
            </a>
          </li>
          <li>
            <a 
              href="#budgets" 
              className={activeView === 'budgets' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'budgets')}
            >
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </span>
              <span>Budgets</span>
            </a>
          </li>
          <li>
            <a 
              href="#goals" 
              className={activeView === 'goals' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'goals')}
            >
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L11 13.17l7.59-7.59L20 7l-8 8z"/>
                </svg>
              </span>
              <span>Goals</span>
            </a>
          </li>
          <li>
            <a 
              href="#reports" 
              className={activeView === 'reports' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'reports')}
            >
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </span>
              <span>Reports</span>
            </a>
          </li>
          <li>
            <a 
              href="#settings" 
              className={activeView === 'settings' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, 'settings')}
            >
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              </span>
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <p className="version-info">Version 0.2.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
