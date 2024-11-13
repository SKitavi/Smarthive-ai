import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUpload, FiInfo, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi'; // Import icons
import { Tooltip } from 'react-tooltip'; // Optional: For tooltips, you may need to install a tooltip library

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { path: '/', icon: <FiHome />, label: 'Home' },
    { path: '/upload', icon: <FiUpload />, label: 'Upload' },
    { path: '/about', icon: <FiInfo />, label: 'About' },
    { path: '/dashboard', icon: <FiGrid />, label: 'Dashboard' }
  ];

  return (
    <div className={`flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-gray-800 text-white transition-width duration-300`}>
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-4 mt-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center p-3 hover:bg-gray-700 cursor-pointer"
            data-tooltip={isCollapsed ? item.label : undefined} // Tooltip when collapsed
          >
            <div className="text-lg">{item.icon}</div>
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
