import React from 'react';
import './UserDashboard.css'; // Import the CSS file for styling

const Card = ({ borderClass, iconClass, title, value, percentage }) => {
  return (
    <div className={`col`}>
      <div className={`card radius-10 ${borderClass}`}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div>
              <p className="mb-0 text-secondary">{title}</p>
              <h4 className="my-1">{value}</h4>
              <p className="mb-0 font-13">{percentage}</p>
            </div>
            <div className={`widgets-icons-2 rounded-circle ${iconClass}`}>
              <i className={`fa ${iconClass}`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
