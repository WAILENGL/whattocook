import React, { useState } from 'react';

export default function IngredientForm() {
	const [ingredient, setIngredient] = useState('');
	const [ingredientList, setIngredientList] = useState([]);

	// this allows user to input ingredients from kitchen one by one
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
				`https://api.spoonacular.com/recipes/findByIngredients?apiKey=b662b7888b3642d2ad673e21b66ea7cd&ingredients=${ingredientString}&number=10`
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error('There was a problem with the search:', error);
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
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
