import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import Upload from './pages/Upload';
import Home from './pages/Home';
import About from './pages/About';
// import DataVisualization from './pages/DataVisualization';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './pages/Dashboard';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <ToastContainer />

        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main content adjusted for fixed sidebar */}
        <div className="flex-1" style={{ marginLeft: isSidebarCollapsed ? '5rem' : '16rem' }}>
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/data-visualization" element={<DataVisualization />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
