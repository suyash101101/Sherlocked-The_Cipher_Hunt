import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isLevel = location.pathname === '/level';

  return (
    <nav
      className={`p-4 ${
        isLevel ? 'bg-[#1F0C00]' : 'bg-gray-800'
      } transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">Sherlocked</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
          <li><Link to="/leaderboard" className="text-white hover:text-gray-300">Leaderboard</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
