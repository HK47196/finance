import React, { useState } from 'react';
import Card from '../../components/Card';
import GoalsList from './GoalsList';
import AddGoalForm from './AddGoalForm';
import './GoalsView.css';

function GoalsView() {
  return (
    <>
      <div className="goals-grid">
        <Card
          title="Financial Goals"
          icon={
            <span className="emoji-icon" role="img" aria-label="trophy">🏆</span>
          }
          variant="primary"
        >
          <GoalsList />
        </Card>
        <Card
          title="Add New Goal"
          icon={
            <span className="emoji-icon" role="img" aria-label="add goal">➕</span>
          }
          variant="success"
        >
          <AddGoalForm />
        </Card>
      </div>
    </>
  );
}

export default GoalsView;