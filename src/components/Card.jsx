import React from 'react';

const Card = ({ groupName, ticket, users, groupBy }) => {
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
    }
    return str;
  };

  const getUserInitials = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      return user.name.split(' ').map(n => n[0]).join(''); 
    }
    return 'NA';
  };

  const truncatedTitle = truncateString(ticket.title, 60);

  const getUserStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    return user && user.available ? 'available' : 'unavailable';
  };



  const getPriorityNumber = (priority) => {
    return priority; 
  };

  return (
    <div className='card'>
      <div className='card-top'>
        <p className='tab-numbers'>{ticket.id}</p>
        {groupBy !== 'user' && (
          <div className='card-user-img'>
            <p>{getUserInitials(ticket.userId)}</p>
            <span className={`status-dot ${getUserStatus(ticket.userId)}`}></span>
          </div>
        )}
      </div>

      <p className='card-title'>{truncatedTitle}</p>

      <div className='card-bottom'>
        {groupBy === 'status' && (
          <>
            <div className='card-priority'>
              <img src={`/icons/priority-${getPriorityNumber(ticket.priority)}.svg`} alt="priority" />
            </div>
            <div className='card-tag'><span>{ticket.tag[0]}</span></div>
          </>
        )}
        {groupBy === 'priority' && (
          <div className='card-tag'><span>{ticket.tag[0]}</span></div> 
        )}
        {groupBy === 'user' && (
          <>
            <div className='card-priority'>
              <img src={`/icons/priority-${getPriorityNumber(ticket.priority)}.svg`} alt="priority" />
            </div>
            <div className='card-tag'><span>{ticket.tag[0]}</span></div> 
          </>
        )}
      </div>
    </div>
  );
};

export default Card;


