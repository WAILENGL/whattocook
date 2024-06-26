import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { API_KEY } from '../key';

export default function IngredientForm({ setRecipes }) {
	const [ingredient, setIngredient] = useState('');
	const [ingredientList, setIngredientList] = useState([]);
	const [searching, setSearching] = useState(false);
	const goToResults = useNavigate();
	const validWord = /\b[a-zA-Z\s]+\b/;

	useEffect(() => {
		const storedIngredients = JSON.parse(
			localStorage.getItem('ingredientList')
		);
		if (storedIngredients) {
			setIngredientList(storedIngredients);
		}
	}, []);

	// this allows user to input ingredients from kitchen one by one, look into local storage to keep ingredient list
	function handleSubmit(event) {
		event.preventDefault();
				if (validWord.test(ingredient)) {
			const lowercaseIngredient = ingredient.toLowerCase();
			// this checks for whether the input matches any of the ingredients already on the list and returns "false" if it does
			if (
				!ingredientList.some((i) => i.toLowerCase() === lowercaseIngredient)
			) {
				setIngredientList([...ingredientList, ingredient]);
				setIngredient('');
				// save ingredientList to local storage
				localStorage.setItem('ingredientList', JSON.stringify(ingredientList));
			} else {
				alert(`${ingredient} is already in the list.`);
				setIngredient('');
			}
		} else {
			alert(`Please only enter ingredients!`);
			setIngredient('');
		}
	}
	// this removes the ingredient from the ingredient list
	function handleRemove(index) {
		let editIngredients = [...ingredientList];
		editIngredients.splice(index, 1);
		setIngredientList(editIngredients);
		localStorage.setItem('ingredientList', JSON.stringify(editIngredients));
	}

	// searches for recipes with the ingredient input
	async function handleSearch() {
		let ingredientString = ingredientList.join(',+');
		try {
			setSearching(true);
		
			const response = await fetch(
				`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${ingredientString}&fillingredients=false&number=6`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();

			setRecipes(data);
			goToResults('/Recipelist'); // Navigate to /Recipelist after fetching recipes
		} catch (error) {
			console.error('There was a problem with the search:', error);
		}
		finally {
				setSearching(false); // Set searching state back to false after search completes
			}
        }
	

	if (searching) {
        return (
            <div className="text-center mt-5 text-black">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
				<p>Searching...</p>
            </div>
        );
    }

	return (
		<div
			style={{
				backgroundImage: `url('https://github.com/WAILENGL/whattocook/blob/main/Images/OIG3.6l06ZgfIeBvGrS9K9NVk.jpg?raw=true')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: '100vh',
				padding: '5rem',
			}}
		><h2 className='text-center text-white mb-4'>What's In Your Kitchen?</h2>
			<div className="container flex-column justify-content-center align-items-center">
				<form onSubmit={handleSubmit} className="text-center">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<input
								type="search"
								value={ingredient}
								onChange={(event) => setIngredient(event.target.value)}
								placeholder="Enter Ingredients Here"
								className="form-control"
							/>
						</div>
						<div className="col-md-2">
							<button type="submit" className="btn btn-primary">
								Add Ingredient
							</button>
						</div>
					</div>
				</form>
				<ul className="list-group list-group-horizontal-sm flex-wrap justify-content-center">
					{ingredientList.map((ingredient, index) => (
						<li
							key={index}
							className="list-group-item d-flex align-items-center mt-3 ms-1 text-white"
							style={{
								flex: '0 0 auto', // adjust the width of each li element to fit its content
								marginRight: '1rem', // add some margin between elements
								backgroundColor: '#93c759',
								color: 'white',
								padding: '0.5rem 1rem',
								borderRadius: '25px',
							}}
						>
							<span
								className="mr-2"
								style={{
									fontSize: 20,
									display: 'inline-block',
									whiteSpace: 'nowrap', // prevent wrapping of long ingredients
									fontWeight: 'bold',
								}}
							>
								{' '}
								{ingredient}
							</span>
							<button
								type="button"
								onClick={() => handleRemove(index)}
								className="btn btn-danger btn-sm ml-auto"
								style={{
									fontSize: '0.8rem',
									padding: '0.25rem 0.5rem',
									lineHeight: '1',
									backgroundColor: 'transparent',
									border: 'none',
									borderRadius: '50%',
									cursor: 'pointer',
									marginLeft: '1rem',
									color: 'white',
								}}
							>
								X
							</button>
						</li>
					))}
				</ul>
				<div className="text-center">
					<button
						type="button"
						onClick={handleSearch}
						className="btn btn-success btn-lg mt-3"
					>
						Search Recipes
					</button>
				</div>
			</div>
		</div>
	);
}
