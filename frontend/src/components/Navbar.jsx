import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-semibold text-indigo-600">
          Home
        </Link>
        <div className="flex space-x-4">
          <Link to="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </Link>
          <Link to="/upload" className="text-gray-700 hover:text-indigo-600">
            Upload File
          </Link>
        </div>
      </div>
    </nav>
  );
}
