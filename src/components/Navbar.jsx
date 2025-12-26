import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left side - Logo */}
        <div className="nav-brand">
          <Link to="/" className="brand-link">SMART VOTE</Link>
        </div>

        {/* Right side - Navigation Links */}
        <div className="nav-links-container">
          <ul className="nav-links">
            <li><Link to="/tally" className="nav-link">VOTE TALLY</Link></li>
            <li><Link to="/guidelines" className="nav-link">VOTER'S GUIDELINES</Link></li>
            <li className="nav-button-container">
              <Link to="/vote" className="vote-button">VOTE</Link>
            </li>
            <li className="nav-button-container">
              <Link to="/signup" className="signup-button">SIGN UP</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
