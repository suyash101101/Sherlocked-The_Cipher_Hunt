import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
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

