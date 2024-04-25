import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IngredientForm({ setRecipes }) {
	const [ingredient, setIngredient] = useState('');
	const [ingredientList, setIngredientList] = useState([]);
	const goToResults = useNavigate(); 

	// this allows user to input ingredients from kitchen one by one, look into local storage to keep ingredient list
	function handleSubmit(event) {
		event.preventDefault();
		setIngredientList([...ingredientList, ingredient]);
		setIngredient('');
	}

	// this removes the ingredient from the ingredient list
	function handleRemove(index) {
		let editIngredients = [...ingredientList];
		editIngredients.splice(index, 1);
		setIngredientList(editIngredients);
	}

	// searches for recipes with the ingredient input
	async function handleSearch() {
		let ingredientString = ingredientList.join(',+');
		try {
			const response = await fetch(
				`https://api.spoonacular.com/recipes/findByIngredients?apiKey=212906df28ff4c0dbb3e9b2dd915adcd&ingredients=${ingredientString}&number=3`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();
			setRecipes(data);
			goToResults('/Recipelist') // Navigate to /Recipelist after fetching recipes
		} catch (error) {
			console.error('There was a problem with the search:', error);
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="search"
					value={ingredient}
					onChange={(event) => setIngredient(event.target.value)}
				/>
				<button type="submit">Add Ingredient</button>
			</form>
			<ul>
				{ingredientList.map((ingredient, index) => (
					<li key={index}>
						{ingredient}
						<button type="button" onClick={() => handleRemove(index)}>
							❌
						</button>
					</li>
				))}
			</ul>
			<button type="button" onClick={handleSearch}>
				Search Recipes
			</button>
		</div>
	);
}
