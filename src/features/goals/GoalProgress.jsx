import React from 'react';
import './GoalProgress.css';

function GoalProgress({ goal }) {
  const { currentAmount, targetAmount } = goal;
  const progressPercent = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  
  // Determine status based on progress
  let statusClass = '';
  if (progressPercent < 25) {
    statusClass = 'status-early';
  } else if (progressPercent < 50) {
    statusClass = 'status-started';
  } else if (progressPercent < 75) {
    statusClass = 'status-progress';
  } else if (progressPercent < 100) {
    statusClass = 'status-almost';
  } else {
    statusClass = 'status-complete';
  }

  return (
    <div className="goal-progress-container">
      <div className="goal-progress-bar">
        <div 
          className={`progress-fill ${statusClass}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="goal-progress-info">
        <span className="progress-percent">{progressPercent}% Complete</span>
        <span className="remaining-amount">
          ${(targetAmount - currentAmount).toLocaleString()} to go
        </span>
      </div>
    </div>
  );
}

export default GoalProgress;