import React from 'react';
import './Card.css';

function Card({ title, children, icon, actionElement, className = '', variant = 'default' }) {
  return (
    <div className={`card card-${variant} ${className}`}>
      {(title || icon || actionElement) && (
        <div className="card-header">
          <div className="card-header-left">
            {icon && <div className="card-icon">{icon}</div>}
            {title && <h2 className="card-title">{title}</h2>}
          </div>
          {actionElement && (
            <div className="card-actions">
              {actionElement}
            </div>
          )}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
