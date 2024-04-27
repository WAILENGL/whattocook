import React, { useState, useEffect } from 'react';
import FavouriteButton from './FavouriteButton';
import { useParams } from 'react-router-dom';

export default function RecipeDetails({ favourites, setFavourites }) {
	const [recipe, setRecipe] = useState(null);
	const [isFavourite, setIsFavourite] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		// Fetch recipe details
		async function fetchRecipeDetails() {
			try {
				const response = await fetch(
					`https://api.spoonacular.com/recipes/${id}/information?apiKey=d045314fa27c447d95a43679d38cc87a`
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data = await response.json();
				setRecipe(data);
			} catch (error) {
				console.log(error.message);
			}
		}
		fetchRecipeDetails();
	}, [id]);

	async function handleFavouriteClick() {
		setIsFavourite(!isFavourite);
	
		// Add recipe to favourites
		if (!isFavourite) {
		
			setFavourites([...favourites, recipe]);

			// Add recipe details to Airtable
			await addRecipe(recipe); 
		} else {
			// Remove recipe from favourites
			const updatedFavourites = favourites.filter(
				(favourite) => favourite.id !== recipe.id
			);
			setFavourites(updatedFavourites);
			// Remove recipe details from Airtable
			await removeRecipe(recipe.airtableRecordId);
		}
	}

	async function addRecipe(recipe) {
		try {
			const response = await fetch(
				'https://api.airtable.com/v0/appuYbPHjZGoIMUna/Table%201',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization:
							'Bearer pataLVU90Nitd5Zlf.cac2198f3be43e7dfa6b0cff6ef0fc36edf1e96195e9fd931963957f48bf47c8',
					},
					body: JSON.stringify({
						"fields": {
							"recipeid": String(recipe.id),
							"title": String(recipe.title),
							"image": String(recipe.image),
						},
					}),
				}
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();
			let airtableRecordId = data.id;
			setRecipe(recipe);
			console.log(airtableRecordId)
			
		} catch (error) {
			console.log(error.message);
		}
	}

	async function removeRecipe(airtableRecordId) {
		try {
			const response = await fetch(
				`https://api.airtable.com/v0/appuYbPHjZGoIMUna/Table%201/${airtableRecordId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization:
							'Bearer pataLVU90Nitd5Zlf.cac2198f3be43e7dfa6b0cff6ef0fc36edf1e96195e9fd931963957f48bf47c8',
					},
				}
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	if (!recipe) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="container mt-5">
				<div className="row">
					<div className="col-12">
						<h2 className="text-center mt-4 mb-4">{recipe.title}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<img src={recipe.image} className="img-fluid" alt={recipe.title} />
					</div>
					<div className="col-md-6">
						<FavouriteButton
							recipe={recipe}
							isFavourite={isFavourite}
							onClick={handleFavouriteClick}
						/>
						<h5>Ingredients:</h5>
						<ul>
							{recipe.extendedIngredients.map((ingredient, index) => (
								<li key={index}>{ingredient.original}</li>
							))}
						</ul>
						<br />
						<h5>Instructions:</h5>
						{recipe.analyzedInstructions[0].steps.map((recipeStep, index) => (
							<div key={index}>
								{recipeStep.number}. {recipeStep.step}
								<p></p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
