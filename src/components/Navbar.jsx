import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link to="/" className="navbar-brand">
        What to Cook Today?
      </Link>
      <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <Link to="/favourites" className="nav-link">
            Favourites
          </Link>
        </li>
      </ul>
    </nav>
  );
}