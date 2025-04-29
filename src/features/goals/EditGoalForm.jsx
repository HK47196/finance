import React, { useState, useEffect } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { createPortal } from 'react-dom';
import './EditGoalForm.css';

const GOAL_CATEGORIES = [
  { id: 'savings', name: 'Savings' },
  { id: 'retirement', name: 'Retirement' },
  { id: 'purchase', name: 'Major Purchase' },
  { id: 'debt', name: 'Debt Payoff' },
  { id: 'education', name: 'Education' },
  { id: 'travel', name: 'Travel' },
  { id: 'other', name: 'Other' }
];

function EditGoalForm({ goal, onClose }) {
  const { editGoal } = useFinance();
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [currentAmount, setCurrentAmount] = useState(goal.currentAmount);
  const [targetDate, setTargetDate] = useState(goal.targetDate);
  const [category, setCategory] = useState(goal.category);
  const [notes, setNotes] = useState(goal.notes || '');
  const [error, setError] = useState('');
  
  // Create portal container for modal
  const [modalContainer] = useState(() => {
    const div = document.createElement('div');
    div.className = 'modal-container';
    return div;
  });
  
  useEffect(() => {
    document.body.appendChild(modalContainer);
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.removeChild(modalContainer);
      document.body.classList.remove('modal-open');
    };
  }, [modalContainer]);

  // Get minimum date (today) for the date picker
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter a goal name');
      return;
    }
    
    if (isNaN(parseFloat(targetAmount)) || parseFloat(targetAmount) <= 0) {
      setError('Please enter a valid target amount');
      return;
    }
    
    if (isNaN(parseFloat(currentAmount)) || parseFloat(currentAmount) < 0) {
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

    // Update the goal
    editGoal(goal.id, {
      name: name.trim(),
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount),
      targetDate,
      category,
      notes: notes.trim()
    });

    onClose();
  };

  // Handle click outside the modal to close it
  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Goal</h2>
          <button className="modal-close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <form className="edit-goal-form" onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="goal-name">Goal Name</label>
              <input
                type="text"
                id="goal-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    modalContainer
  );
}

export default EditGoalForm;