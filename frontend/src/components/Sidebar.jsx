import { Link } from "react-router-dom";
import {
  FiHome,
  FiUpload,
  FiInfo,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiBarChart2,
} from "react-icons/fi"; // Import FiBarChart2 for Data Visualization icon
import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { path: "/", icon: <FiHome />, label: "Home" },
    { path: "/upload", icon: <FiUpload />, label: "Upload" },
    { path: "/about", icon: <FiInfo />, label: "About" },
    { path: "/dashboard", icon: <FiGrid />, label: "Dashboard" },
    {
      path: "/data-visualization",
      icon: <FiBarChart2 />,
      label: "Data Visualization",
    }, // New Data Visualization link
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } fixed top-0 left-0 h-screen bg-gray-800 text-white transition-width duration-300 flex flex-col`}
    >
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

Sidebar.PropTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired, // Function to toggle the sidebar state
};

export default Sidebar;
