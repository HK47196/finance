import React, { useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import GoalProgress from './GoalProgress';
import EditGoalForm from './EditGoalForm';
import './GoalsList.css';

function GoalsList() {
  const { goals, deleteGoal } = useFinance();
  const [editingGoal, setEditingGoal] = useState(null);

  const handleEditClick = (goal) => {
    setEditingGoal(goal);
  };

  const handleCloseEdit = () => {
    setEditingGoal(null);
  };

  // Sort goals by target date (closest first)
  const sortedGoals = [...goals].sort((a, b) => {
    return new Date(a.targetDate) - new Date(b.targetDate);
  });

  if (goals.length === 0) {
    return (
      <div className="empty-goals">
        <span className="empty-state-emoji" role="img" aria-label="trophy">🏆</span>
        <h3>No Goals Yet</h3>
        <p>Start by adding a financial goal to track your progress.</p>
      </div>
    );
  }

  return (
    <div className="goals-list">
      {sortedGoals.map(goal => (
        <div key={goal.id} className="goal-card">
          <div className="goal-header">
            <div className="goal-title">
              <h3>{goal.name}</h3>
              <span className={`goal-tag ${goal.category}`}>{goal.category}</span>
            </div>
            <div className="goal-actions">
              <button 
                className="icon-button edit"
                onClick={() => handleEditClick(goal)}
                aria-label="Edit goal"
              >
                <span className="emoji-icon" role="img" aria-label="edit">✏️</span>
              </button>
              <button 
                className="icon-button delete"
                onClick={() => deleteGoal(goal.id)}
                aria-label="Delete goal"
              >
                <span className="emoji-icon" role="img" aria-label="delete">🗑️</span>
              </button>
            </div>
          </div>
          
          <div className="goal-details">
            <div className="goal-amount">
              <p>Target: <span className="amount">${goal.targetAmount.toLocaleString()}</span></p>
              <p>Current: <span className="amount">${goal.currentAmount.toLocaleString()}</span></p>
            </div>
            <div className="goal-date">
              <p>Target Date: <span>{new Date(goal.targetDate).toLocaleDateString()}</span></p>
              <p className="days-left">
                {Math.max(0, Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24)))} days left
              </p>
            </div>
          </div>
          
          <GoalProgress goal={goal} />
          
          <div className="goal-notes">
            {goal.notes && <p>{goal.notes}</p>}
          </div>
        </div>
      ))}

      {editingGoal && (
        <EditGoalForm goal={editingGoal} onClose={handleCloseEdit} />
      )}
    </div>
  );
}

export default GoalsList;