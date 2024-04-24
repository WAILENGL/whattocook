import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import './App.css' */
import { Route, Routes } from "react-router-dom";
import RecipeList from './components/Recipelist';
import IngredientForm from './components/IngredientForm';
import NavBar from './components/Navbar';

export default function App() {
  const [recipes, setRecipes] = useState([]);

	return (
		<>
			<NavBar />

			<Routes>
      <Route path="/" element={<IngredientForm setRecipes={setRecipes} />} />
      <Route path="/Recipelist" element={<RecipeList recipes={recipes} />} />
			</Routes>
    
		</>
	);
}