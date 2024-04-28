import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export default function FavouriteRecipes({ favourites, setFavourites }) {
  const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFavourites() {
			try {
				const response = await fetch(
					'https://api.airtable.com/v0/appuYbPHjZGoIMUna/Table%201',
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization:
								'Bearer pataLVU90Nitd5Zlf.cac2198f3be43e7dfa6b0cff6ef0fc36edf1e96195e9fd931963957f48bf47c8',
						},
					}
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data = await response.json();
				setFavourites(data.records);
				console.log(data);
        setLoading(false);
			} catch (error) {
				console.log(error.message);
			}
      
		}
		fetchFavourites();
	}, []);

	return (
		<div
			style={{
				backgroundImage: `url('https://github.com/WAILENGL/whattocook/blob/main/Images/OIG3.png?raw=true')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: '100%',
				padding: '2rem',
			}}
		>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center mt-3 mb-4 text-white">
							Your Favourite Recipes
						</h2>
					</div>
				</div>
        {loading ? (
          <div className="text-center mt-5 text-white">
            <Spinner animation="border" role="status">
      <span className='visually-hidden'>getting your favourite recipes...</span>
    </Spinner>
    <p>getting your favourite recipes...</p>
            </div>
         
        ) :(
				<div className="row">
					{favourites.map((recipe) => (
						<div key={recipe.id} className="col-md-4">
							<Link
								to={`/recipe/${recipe.fields ? recipe.fields.recipeid : ''}`}
								className="card mb-4"
							>
								<img
									src={recipe.fields ? recipe.fields.image : ''}
									className="card-img-top"
									alt={recipe.fields ? recipe.fields.title : ''}
								/>
								<div className="card-body">
									<h5
										className="card-title"
										style={{ height: '45px', textAlign: 'center' }}
									>
										{recipe.fields && recipe.fields.title}
									</h5>
								</div>
							</Link>
						</div>
					))}
				</div>
         )}
			</div>
		</div>
	);
}
