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
		<div className="container flex-column justify-content-center align-items-center">
			<form onSubmit={handleSubmit} className="text-center mt-5">
			<div className="row justify-content-center">
			<div className="col-md-6">
				<input
					type="search"
					value={ingredient}
					onChange={(event) => setIngredient(event.target.value)}
					placeholder='Enter Ingredients Here'
					 className="form-control"
				/>
				     </div>
					 <div className="col-md-2">
				<button type="submit" className="btn btn-primary">Add Ingredient</button>
				</div>
            </div>
			</form>
			<ul className="list-group list-group-horizontal-sm flex-wrap justify-content-center">
  {ingredientList.map((ingredient, index) => (
    <li key={index} className="list-group-item d-flex align-items-center mt-3 ms-1 text-white" style={{
      flex: '0 0 auto', // adjust the width of each li element to fit its content
      marginRight: '1rem', // add some margin between elements
      backgroundColor: '#93c759',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '25px'
    }}>
      <span
        className="mr-2"
        style={{
          fontSize: 19,
          width: `${Math.min(300, ingredient.length * 10)}px`, // adjust width based on ingredient length
          display: 'inline-block', 
          overflow: 'hidden', // prevent long ingredients from overflowing
          whiteSpace: 'nowrap' // prevent wrapping of long ingredients
        }}
      > {ingredient}</span>
          <button type="button" onClick={() => handleRemove(index)} className="btn btn-danger btn-sm ml-auto" style={{
        fontSize: '0.8rem',
        padding: '0.25rem 0.5rem',
        lineHeight: '1',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
		marginLeft: '1rem',
		color: "white"
      }}>
            X
          </button>
        </li>
      ))}
    </ul>
			<div className="text-center">
			<button type="button" onClick={handleSearch} className="btn btn-success btn-lg mt-3">
				Search Recipes
			</button>
			</div>
		</div>
		</div>
	);
}
