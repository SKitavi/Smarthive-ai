import { Link } from "react-router-dom";
import {
  FiHome,
  FiUpload,
  FiInfo,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  // FiBarChart2,
} from "react-icons/fi";
import PropTypes from "prop-types";
import logo from '../assets/logo.png'; // Adjust the path to your logo file

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { path: "/", icon: <FiHome />, label: "Home" },
    { path: "/dashboard", icon: <FiGrid />, label: "Dashboard" },
    { path: "/upload", icon: <FiUpload />, label: "Upload" },
    // {
    //   path: "/data-visualization",
    //   icon: <FiBarChart2 />,
    //   label: "Data Visualization",
    // },
    { path: "/about", icon: <FiInfo />, label: "About" },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } fixed top-0 left-0 h-screen bg-gray-800 text-white transition-width duration-300 flex flex-col`}
    >
      {/* Logo and System Name */}
      <div className="flex items-center justify-center">
        <img
          src={logo}
          alt="SmartHive AI Logo"
          className={`${
            isCollapsed ? "w-28 h-20" : "w-32 h-26"
          } mr-2`} // Adjust size based on sidebar state
        />
        {/* {!isCollapsed && (
          <h1 className="text-xl font-semibold text-center">SmartHive AI</h1>
        )} */}
      </div>

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

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired, // Function to toggle the sidebar state
};

export default Sidebar;
