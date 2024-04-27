import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList({ recipes }) {
	return (
		<div style={{
			backgroundImage: `url('https://github.com/WAILENGL/whattocook/blob/main/Images/OIG3.png?raw=true')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			height: '100vh',
			padding: '5rem'
		  }}>
			<div className="container mt-5">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center mt-4 mb-4 text-white">Here's What You Can Cook!</h2>
					</div>
				</div>
				<div className="row">
					{recipes.map((recipe) => (
						<div key={recipe.id} className="col-md-4 mb-4">
							<Link to={`/recipe/${recipe.id}`} className="card mb-4">
								<img
									src={recipe.image}
									className="card-img-top"
									alt={recipe.title}
								/>
								<div className="card-body">
									<h5
										className="card-title"
										style={{ height: '35px', textAlign: 'center' }}
									>
										{recipe.title}
									</h5>
									<p className="card-text">{recipe.summary}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
      </div>
	);
}
