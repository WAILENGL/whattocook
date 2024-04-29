import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand" style={{ fontSize: '30px' }}>
					What to Cook Today?
				</Link>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link
								to="/favourites"
								className="nav-link text-white"
								style={{ fontSize: '20px' }}
							>
								Your Favourite Recipes
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
