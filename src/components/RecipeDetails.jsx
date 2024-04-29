import React, { useState, useEffect } from 'react';
import FavouriteButton from './FavouriteButton';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { API_KEY } from '../key';

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
					`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
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
					<div className="col-md-12 d-flex align-items-center">
					<div className="w-100 text-center">
						<img src={recipe.image} className="img-fluid" alt={recipe.title} />
					
						 </div>
						 </div>
						
						  <div className="card border-primary mt-4 mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <div className="card-header d-flex justify-content-between align-items-center">
				<span className=" fs-4 mb-0 me-auto">Recipe Summary</span>
				<div className="p-0">
        <p className="m-0">
						<FavouriteButton
							recipe={recipe}
							isFavourite={isFavourite}
							onClick={handleFavouriteClick}
						/></p>
				</div>
				</div>
                <div className="card-body">
                    <p className="card-text text-justify" dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                
            </div>
			</div>
			<div className="row">
					<div className="col-md-6">
					
						<h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>Ingredients:</h4>
						<ul style={{ fontSize: '18px'}}>
							{recipe.extendedIngredients.map((ingredient, index) => (
								<li key={index}>{ingredient.original}</li>
							))}
						</ul>
						</div>
						<div className="col-md-6 text-justify">
						
						<h4 style={{ fontSize: '20px', fontWeight: 'bold' }}>Instructions:</h4>
						{recipe.analyzedInstructions[0].steps.map((recipeStep, index) => (
							<div key={index} style={{ fontSize: '18px'}}>
								{recipeStep.number}. {recipeStep.step}
								<p></p>
							</div>
						))}
						</div>
					</div>
				</div>
			</div>
			</div>
	);
}
