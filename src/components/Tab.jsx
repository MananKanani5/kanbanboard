import React from 'react';
import Card from "./Card";

const Tab = ({ groupName, tickets, users, groupBy }) => {
    const getTabIcon = () => {
        if (groupBy === 'user') {
          const user = users.find(user => user.name === groupName);
          if (user) {
            const initials = user.name.split(' ').map(n => n[0]).join('');
            return (
              <div className="card-user-img">
                <p>{initials}</p>
              </div>
            );
          }
          return (
            <div className="user-initials-tab">
              <p>NA</p>
            </div>
          );
        } 
        
        else if (groupBy === 'priority') {
          const priorityNumber = groupName.split(' ')[0];
          return `/icons/priority-${priorityNumber}.svg`;
        } 
        
        else if (groupBy === 'status') {
          const statusIcons = {
            'Todo': '/icons/todo.svg',
            'In progress': '/icons/in-progress.svg',
            'done': '/icons/done.svg',
            'Backlog': '/icons/backlog.svg',
            'Cancelled': '/icons/cancelled.svg',
          };
          
          return statusIcons[groupName];
        }
      };
      
      

  return (
    <div className='tab'>
      <div className='col-head'>
        <div className='head-left'>
          {groupBy === 'user' ? getTabIcon() : <img className='tab-icon' src={getTabIcon()} alt="tab-icon" />}
          <p className='tab-title'>{groupName}</p>
          <p className='tab-numbers'>{tickets.length}</p>
        </div>
        <div className='head-right'>
          <a href=""><img className='tab-icon' src="/icons/add.svg" alt="add" /></a>
          <a href=""><img className='tab-icon' src="/icons/menu.svg" alt="menu" /></a>
        </div>
      </div>
      <div className='col-body'>
        {tickets.map(ticket => (
          <Card key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
        ))}
      </div>
    </div>
  );
};

export default Tab;
