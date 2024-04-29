import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import RecipeList from './components/Recipelist';
import IngredientForm from './components/IngredientForm';
import RecipeDetails from './components/RecipeDetails';
import FavouriteRecipes from './components/FavouriteRecipes';
import NavBar from './components/Navbar';


export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  
  
	return (
		<>
			<NavBar />

			<Routes>
      <Route path="/" element={<IngredientForm setRecipes={setRecipes} />} />
      <Route path="/recipelist" element={<RecipeList recipes={recipes}/>} />
	  <Route path="/recipe/:id" element={<RecipeDetails favourites={favourites} setFavourites={setFavourites}/>} />
	  <Route path="/favourites" element={<FavouriteRecipes favourites={favourites} setFavourites={setFavourites}/>} /> 
			</Routes>
    
		</>
	);
}