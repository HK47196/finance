import React, { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import './AddGoalForm.css';

const GOAL_CATEGORIES = [
  { id: 'savings', name: 'Savings' },
  { id: 'retirement', name: 'Retirement' },
  { id: 'purchase', name: 'Major Purchase' },
  { id: 'debt', name: 'Debt Payoff' },
  { id: 'education', name: 'Education' },
  { id: 'travel', name: 'Travel' },
  { id: 'other', name: 'Other' }
];

function AddGoalForm() {
  const { addGoal } = useFinance();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('savings');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Get minimum date (today) for the date picker
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter a goal name');
      return;
    }
    
    if (!targetAmount || isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      setError('Please enter a valid target amount');
      return;
    }
    
    if (!currentAmount || isNaN(parseFloat(currentAmount)) || parseFloat(currentAmount) < 0) {
      setError('Please enter a valid current amount');
      return;
    }
    
    if (parseFloat(currentAmount) > parseFloat(targetAmount)) {
      setError('Current amount cannot be greater than target amount');
      return;
    }
    
    if (!targetDate) {
      setError('Please select a target date');
      return;
    }

    // Create new goal
    addGoal({
      name: name.trim(),
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      targetDate,
      category,
      notes: notes.trim()
    });

    // Reset form
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setTargetDate('');
    setCategory('savings');
    setNotes('');
    setError('');
  };

  return (
    <form className="add-goal-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="goal-name">Goal Name</label>
        <input
          type="text"
          id="goal-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Down Payment for House"
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="target-amount">Target Amount ($)</label>
          <input
            type="number"
            id="target-amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            step="0.01"
            min="0"
            placeholder="10000"
          />
        </div>
        <div className="form-group">
          <label htmlFor="current-amount">Current Amount ($)</label>
          <input
            type="number"
            id="current-amount"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            step="0.01"
            min="0"
            placeholder="0"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="target-date">Target Date</label>
          <input
            type="date"
            id="target-date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            min={today}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {GOAL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
          placeholder="Add any additional details about your goal..."
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Add Goal
      </button>
    </form>
  );
}

export default AddGoalForm;