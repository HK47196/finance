import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getCurrentMonthYear, getPreviousMonths } from '../utils/dateUtils';

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [categories, setCategories] = useLocalStorage('categories', [
    { id: 'housing', name: 'Housing', type: 'expense' },
    { id: 'transportation', name: 'Transportation', type: 'expense' },
    { id: 'food', name: 'Food & Dining', type: 'expense' },
    { id: 'utilities', name: 'Utilities', type: 'expense' },
    { id: 'entertainment', name: 'Entertainment', type: 'expense' },
    { id: 'healthcare', name: 'Healthcare', type: 'expense' },
    { id: 'shopping', name: 'Shopping', type: 'expense' },
    { id: 'personal', name: 'Personal', type: 'expense' },
    { id: 'education', name: 'Education', type: 'expense' },
    { id: 'salary', name: 'Salary', type: 'income' },
    { id: 'interest', name: 'Interest', type: 'income' },
    { id: 'gifts', name: 'Gifts', type: 'income' },
    { id: 'other_income', name: 'Other Income', type: 'income' },
    { id: 'other_expense', name: 'Other Expense', type: 'expense' }
  ]);
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [goals, setGoals] = useLocalStorage('goals', []);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: transaction.id || crypto.randomUUID(),
      date: transaction.date || new Date().toISOString(),
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) => 
        transaction.id === id ? { ...updatedTransaction, id } : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: category.id || category.name.toLowerCase().replace(/\s+/g, '_')
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const deleteCategory = (id) => {
    setCategories((prevCategories) => 
      prevCategories.filter((category) => category.id !== id)
    );
  };

  const getCategoryById = (id) => {
    return categories.find(cat => cat.id === id);
  };

  const addBudget = (budget) => {
    const newBudget = {
      ...budget,
      id: budget.id || crypto.randomUUID()
    };
    setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
  };

  const deleteBudget = (id) => {
    setBudgets((prevBudgets) => 
      prevBudgets.filter((budget) => budget.id !== id)
    );
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: goal.id || crypto.randomUUID(),
      createdAt: goal.createdAt || new Date().toISOString(),
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const editGoal = (id, updatedGoal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) => 
        goal.id === id ? { ...updatedGoal, id } : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== id)
    );
  };

  const getMonthlyTotals = (month) => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
      if (transaction.date && transaction.date.startsWith(month)) {
        if (transaction.amount > 0) {
          income += transaction.amount;
        } else {
          expenses += transaction.amount;
        }
      }
    });

    return { month, income, expenses: Math.abs(expenses) };
  };

  const balance = useMemo(() => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  }, [transactions]);

  const { monthlyIncome, monthlyExpenses } = useMemo(() => {
    const currentMonth = getCurrentMonthYear();
    return getMonthlyTotals(currentMonth);
  }, [transactions, getMonthlyTotals]);

  const getMonthlySpendingByCategory = (categoryId, month) => {
    return transactions
      .filter(transaction => 
        transaction.category === categoryId && 
        transaction.date && 
        transaction.date.startsWith(month) &&
        transaction.amount < 0
      )
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const exportData = () => {
    const data = JSON.stringify({ transactions, categories, budgets, goals });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `finance-data-${new Date().toISOString()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importData = (data) => {
    if (data.transactions) setTransactions(data.transactions);
    if (data.categories) setCategories(data.categories);
    if (data.budgets) setBudgets(data.budgets);
    if (data.goals) setGoals(data.goals);
  };

  const value = {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    
    categories,
    addCategory,
    deleteCategory,
    getCategoryById,
    
    budgets,
    addBudget,
    deleteBudget,
    getMonthlySpendingByCategory,
    
    goals,
    addGoal,
    editGoal,
    deleteGoal,
    
    exportData,
    importData,
    
    balance,
    monthlyIncome,
    monthlyExpenses,
    getMonthlyTotals,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
