import React, { useState, useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import './TransactionList.css';
import { useFinance } from '../../contexts/FinanceContext';
import { formatCurrency, formatDate, getCurrentMonthYear } from '../../utils/dateUtils';
import EditTransactionForm from './EditTransactionForm';
import './EditTransactionForm.css';
import TransactionFilters from './TransactionFilters';
import { createPortal } from 'react-dom';

function TransactionList({ limit = Infinity, showFilters = true }) { 
  const { transactions, deleteTransaction, getCategoryById } = useFinance();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const modalContainerRef = useRef(null);
  
  const [filters, setFilters] = useState({
    type: 'all',
    category: '',
    dateRange: 'all'
  });
  const [sortOption, setSortOption] = useState('date-desc');

  useEffect(() => {
    if (editModalOpen) {
      document.body.classList.add('modal-open');
      const createModalPortal = () => {
        let portalContainer = document.getElementById('modal-portal-container');
        if (!portalContainer) {
          portalContainer = document.createElement('div');
          portalContainer.id = 'modal-portal-container';
          document.body.appendChild(portalContainer);
        }
        modalContainerRef.current = portalContainer;
        
        setTimeout(() => setModalVisible(true), 10);
      };
      createModalPortal();
    } else {
      setModalVisible(false);
      const timer = setTimeout(() => {
        document.body.classList.remove('modal-open');
        if (modalContainerRef.current) {
          const emptyPortal = document.getElementById('modal-portal-container');
          if (emptyPortal && emptyPortal.childNodes.length === 0) {
            document.body.removeChild(emptyPortal);
          }
        }
      }, 200);
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.classList.remove('modal-open');
      const portalContainer = document.getElementById('modal-portal-container');
      if (portalContainer && portalContainer.childNodes.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [editModalOpen]);

  const openEditModal = (transaction) => {
    setCurrentTransaction(transaction);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };
  
  const filteredAndSortedTransactions = useMemo(() => {
    let results = [...transactions];
    
    if (filters.type === 'income') {
      results = results.filter(transaction => transaction.amount > 0);
    } else if (filters.type === 'expense') {
      results = results.filter(transaction => transaction.amount < 0);
    }
    
    if (filters.category) {
      results = results.filter(transaction => transaction.category === filters.category);
    }
    
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      let startDate;
      
      switch(filters.dateRange) {
        case 'current-month':
          startDate = new Date(currentYear, currentMonth, 1);
          break;
        case 'last-month':
          startDate = new Date(currentYear, currentMonth - 1, 1);
          const endDate = new Date(currentYear, currentMonth, 0);
          results = results.filter(transaction => {
            const txDate = new Date(transaction.date);
            return txDate >= startDate && txDate <= endDate;
          });
          return results;
        case 'last-3-months':
          startDate = new Date(currentYear, currentMonth - 3, 1);
          break;
        case 'last-6-months':
          startDate = new Date(currentYear, currentMonth - 6, 1);
          break;
        case 'current-year':
          startDate = new Date(currentYear, 0, 1);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        results = results.filter(transaction => new Date(transaction.date) >= startDate);
      }
    }
    
    switch (sortOption) {
      case 'date-desc':
        return results.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'date-asc':
        return results.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'amount-desc':
        return results.sort((a, b) => b.amount - a.amount);
      case 'amount-asc':
        return results.sort((a, b) => a.amount - b.amount);
      case 'name-asc':
        return results.sort((a, b) => a.text.localeCompare(b.text));
      case 'name-desc':
        return results.sort((a, b) => b.text.localeCompare(a.text));
      default:
        return results;
    }
  }, [transactions, filters, sortOption]);

  const displayedTransactions = filteredAndSortedTransactions.slice(0, limit);

  const totalTransactions = filteredAndSortedTransactions.length;

  if (transactions.length === 0) {
    return (
      <div className="empty-transactions">
        <div className="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
          </svg>
        </div>
        <p className="empty-message">No transactions yet</p>
        <p className="empty-description">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="transaction-list-container">
      {showFilters && (
        <TransactionFilters 
          filters={filters}
          setFilters={setFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      )}
      
      <div className="transaction-count">
        {totalTransactions} transaction{totalTransactions !== 1 ? 's' : ''} found
      </div>
      
      <div className="transaction-list">
        {displayedTransactions.length > 0 ? (
          <ul>
            {displayedTransactions.map(transaction => {
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
                    <div className="transaction-actions">
                      <span className="transaction-amount">
                        {formatCurrency(transaction.amount)}
                      </span>
                      <button 
                        className="edit-btn" 
                        onClick={() => openEditModal(transaction)}
                        aria-label="Edit transaction"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => deleteTransaction(transaction.id)}
                        aria-label="Delete transaction"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM2 4h3.5l1-1h5l1 1H19v2H5V4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty-transactions">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
            </div>
            <p className="empty-message">No matching transactions</p>
            <p className="empty-description">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {editModalOpen && createPortal(
        <div 
          ref={modalRef}
          className={`modal-overlay ${modalVisible ? 'visible' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEditModal();
          }}
        >
          <div className={`modal-content ${modalVisible ? 'visible' : ''}`}>
            <div className="modal-header">
              <h2>Edit Transaction</h2>
              <button className="modal-close" onClick={closeEditModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {currentTransaction && (
                <EditTransactionForm transaction={currentTransaction} onClose={closeEditModal} />
              )}
            </div>
          </div>
        </div>,
        modalContainerRef.current || document.body
      )}
    </div>
  );
}

export default TransactionList;
