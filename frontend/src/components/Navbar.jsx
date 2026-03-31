import {Link} from "react-router-dom";
import {useEffect, useState} from 'react';


const Navbar = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserType(user?.user_type || null);
    } catch (err) {
      setUserType(null);
    }
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="flex items-center space-x-2">
        <img src=".././src/assets/logo.jpg" alt="AgroLink" className="h-8 rounded-full bg-gray-500" />
        <span className="text-green-700 font-bold text-[18px]">AgroLink Ethiopia</span>
      </div>

      <ul className="hidden md:flex space-x-4 text-gray-700 font-medium">
        <li><Link to="/" className="hover:text-green-700 active:text-green-900">Home</Link></li>
        <li><Link to="/services" className="hover:text-green-700 active:text-green-900">Services</Link></li>
        <li><Link to="/features" className="hover:text-green-700 active:text-green-900">Feature</Link></li>
        <li><Link to="/about" className="hover:text-green-700 active:text-green-900">About</Link></li>
      </ul>

      <div className="space-x-2 flex items-center">
        {userType === 'Admin' && (
          <Link to="/admin-dashboard" className="mr-3 text-gray-700 hover:text-green-700">Admin</Link>
        )}
        <Link to ="/login">
        <button className="border border-green-600 text-green-700 px-3 py-1 rounded-lg hover:bg-green-700 hover:text-white">
          Sign In
        </button>
        </Link>
        <Link to ="/Register">
        <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-800">
          Get Started
        </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
