import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Tab from "./Tab";

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority'
};

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGroupChange = (group) => {
    setGroupBy(group);  
    localStorage.setItem('groupBy', group);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    localStorage.setItem('sortBy', sort);
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title); 
    });
  };

  const groupTickets = () => {
    if (!data) return {};

    if (groupBy === 'status') {
      return data.tickets.reduce((acc, ticket) => {
        acc[ticket.status] = acc[ticket.status] || [];
        acc[ticket.status].push(ticket);
        return acc;
      }, {});
    }

    if (groupBy === 'user') {
      return data.tickets.reduce((acc, ticket) => {
        const user = data.users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        acc[userName] = acc[userName] || [];
        acc[userName].push(ticket);
        return acc;
      }, {});
    }

    if (groupBy === 'priority') {
      return data.tickets.reduce((acc, ticket) => {
        const priorityGroup = priorityLabels[ticket.priority] || 'No priority';
        acc[priorityGroup] = acc[priorityGroup] || [];
        acc[priorityGroup].push(ticket);
        return acc;
      }, {});
    }
  };
  useEffect(() => {
    const savedGroupBy = localStorage.getItem('groupBy');
    const savedSortBy = localStorage.getItem('sortBy');
    if (savedGroupBy) {
      setGroupBy(savedGroupBy);
    }
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const groupedTickets = groupTickets();

  return (
    <>
      <Navbar onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
      <section className='container tabs'>
        {Object.keys(groupedTickets).map((group) => (
          <Tab 
            key={group} 
            groupName={group} 
            tickets={sortTickets(groupedTickets[group])} 
            users={data.users} 
            groupBy={groupBy} 
          />
        ))}
      </section>
    </>
  );
}

export default Home;
