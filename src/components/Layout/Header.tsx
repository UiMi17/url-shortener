import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogoutMutation } from '../../redux/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../../redux/slices/authSlice';
import { selectUser } from '../../redux/selectors';

const Header = () => {
  const user = useSelector(selectUser);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout(null);
    await dispatch(logoutAction());
    setDropdownOpen(false);
  };

  const getNavLinkClass = (path: string) =>
    location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-600 hover:text-blue-600';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          URL Shortener
        </Link>

        <nav className="hidden md:flex gap-4">
          <Link to="/" className={getNavLinkClass('/')}>
            Short URLs
          </Link>
          <Link to="/about" className={getNavLinkClass('/about')}>
            About
          </Link>
        </nav>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.username}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline text-sm text-gray-600">
                {user.username}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <div className="px-4 py-2 text-sm text-gray-500">
                  Email: {user.email}
                </div>
                <hr className="border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth/login')}
            className="text-left block px-4 py-2 text-blue-600 hover:bg-blue-100"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
