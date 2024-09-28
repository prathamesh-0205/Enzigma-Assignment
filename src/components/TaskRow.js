import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const TaskRow = ({ task, onEdit, onDelete, isSelected, onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit(task);
    setDropdownOpen(false); // Close dropdown after selecting
  };

  const handleDelete = () => {
    onDelete(task.id);
    setDropdownOpen(false); // Close dropdown after selecting
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td>{task.assignedTo}</td>
      <td>{task.status}</td>
      <td>{task.dueDate}</td>
      <td>{task.priority}</td>
      <td>{task.comments}</td>
      <td>
        <div className="dropdown" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="dropdown-btn">
            <FaAngleDown />
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
