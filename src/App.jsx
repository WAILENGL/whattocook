import { useState } from 'react'
/* import 'bootstrap/dist/css/bootstrap.min.css' */
import './App.css'


function App() {
  
  //fetch for random recipes
/*   fetch('https://api.spoonacular.com/recipes/random?apiKey=b662b7888b3642d2ad673e21b66ea7cd')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  }); */
  //fetch for ingredient search 
  /* fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey=b662b7888b3642d2ad673e21b66ea7cd&ingredients=apples,+flour,+sugar&number=2')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  }); */

  try {
    fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey=YOUR_API_KEY&ingredients=apples,+flour,+sugar&number=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((recipes) => {
        recipes.forEach((recipe) => {
          const recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=YOUR_API_KEY`;
          console.log(recipeDetailsUrl);
        });
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  } catch (error) {
    console.error('Error during fetch:', error);
  }

    return (
    <>
    <h1 style={{ textAlign: 'center' }} >What To Cook Today</h1>


    </>
  )
}

export default App
