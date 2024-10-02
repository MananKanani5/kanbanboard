import React, { useState, useEffect } from "react";

const Navbar = ({ onGroupChange, onSortChange }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSort, setSelectedSort] = useState("priority");
  const [selectedGroup, setSelectedGroup] = useState("status");

  useEffect(() => {
    const savedGroup = localStorage.getItem("groupBy") || "status";
    const savedSort = localStorage.getItem("sortBy") || "priority";
    setSelectedGroup(savedGroup);
    setSelectedSort(savedSort);
    onGroupChange(savedGroup);
    onSortChange(savedSort);
  }, [onGroupChange, onSortChange]);

  const handleGroupChange = (e) => {
    const value = e.target.value;
    setSelectedGroup(value);
    localStorage.setItem("groupBy", value);
    onGroupChange(value);
    setShowPopup(false);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    localStorage.setItem("sortBy", value);
    onSortChange(value);
  };

  return (
    <>
      <section className="navbar container">
        <div>
          <button className="btn" onClick={() => setShowPopup(!showPopup)}>
            <img src="/icons/Display.svg" alt="" />
            <span>Display</span>
            <img src="/icons/down.svg" alt="" />
          </button>
        </div>
      </section>

      {showPopup && (
        <section className="popup">
          <div className="groupby">
            <p>Group By </p>
            <select
              className="select-dropdown"
              value={selectedGroup}
              onChange={handleGroupChange}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="orderby">
            <p>Sort By </p>
            <select
              className="select-dropdown"
              value={selectedSort}
              onChange={handleSortChange}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </section>
      )}
    </>
  );
};

export default Navbar;
