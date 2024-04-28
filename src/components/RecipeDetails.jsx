import React, { useState, useEffect } from 'react';
import FavouriteButton from './FavouriteButton';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export default function RecipeDetails({ favourites, setFavourites }) {
	const [recipe, setRecipe] = useState(null);
	const [isFavourite, setIsFavourite] = useState(false);
	const [airtableRecordId, setAirtableRecordId] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		// Fetch recipe details
		async function fetchRecipeDetails() {
			try {
				const response = await fetch(
					`https://api.spoonacular.com/recipes/${id}/information?apiKey=b662b7888b3642d2ad673e21b66ea7cd`
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

	// Fetch Airtable data to get recipe's Airtable id for delete record
	useEffect(() => {

		async function fetchAirtableData() {
		  try {
			const response = await fetch(
			  'https://api.airtable.com/v0/appuYbPHjZGoIMUna/Table%201',
			  {
				headers: {
				  Authorization: 'Bearer pataLVU90Nitd5Zlf.cac2198f3be43e7dfa6b0cff6ef0fc36edf1e96195e9fd931963957f48bf47c8',
				},
			  }
			);
			if (!response.ok) {
			  throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();
			const airtableRecipes = data.records;
			const isFavouriteRecipe = airtableRecipes.some((recipe) => recipe.fields.recipeid === id);
			setIsFavourite(isFavouriteRecipe);
			if (isFavouriteRecipe) {
				const airtableRecord = airtableRecipes.find((recipe) => recipe.fields.recipeid === id);
				setAirtableRecordId(airtableRecord.id);
			  }
		  } catch (error) {
			console.log(error.message);
		  }
		}
		fetchAirtableData();
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
			if (airtableRecordId) {
				await removeRecipe(airtableRecordId);
			  }
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
			setAirtableRecordId(data.id);
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

	if (!recipe) {return (
		<div className="text-center mt-5 text-black">
            <Spinner animation="border" role="status">
      <span className='visually-hidden'>Loading...</span>;
	  </Spinner>
	  <p>loading recipe...</p>
	  </div>
	  )
	}

	return (
		<div className='text-white' style={{
			backgroundImage: `url('https://github.com/WAILENGL/whattocook/blob/main/Images/OIG3.png?raw=true')`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			padding: '2.5rem'
			
		  }}>
			<div className="container h-100" style={{ minHeight: '100%' }}>
				<h2 className="text-center mb-4">{recipe.title}</h2>
									<div className="row">
					<div className="col-md-6">
						<img src={recipe.image} className="img-fluid" alt={recipe.title} />
						<p className="d-flex justify-content-center mt-4">
						<FavouriteButton
							recipe={recipe}
							isFavourite={isFavourite}
							onClick={handleFavouriteClick}
						/></p>
					</div>
					<div className="col-md-6">
					
						<h4>Ingredients:</h4>
						<ul>
							{recipe.extendedIngredients.map((ingredient, index) => (
								<li key={index}>{ingredient.original}</li>
							))}
						</ul>
						<br />
						<h4>Instructions:</h4>
						{recipe.analyzedInstructions[0].steps.map((recipeStep, index) => (
							<div key={index}>
								{recipeStep.number}. {recipeStep.step}
								<p></p>
							</div>
						))}
					</div>
				</div>
			</div>
			</div>
	);
}
