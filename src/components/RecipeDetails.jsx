import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchRecipeDetails() {
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=d045314fa27c447d95a43679d38cc87a`);
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
          <h5>Ingredients:</h5>
            <div>
             <ul>{recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
</ul> 
              <br></br>
        <h5>Instructions:</h5>
        {recipe.analyzedInstructions[0].steps.map((recipeStep, index) => (
        <div key={index}>
          {recipeStep.number}. {recipeStep.step}<p></p>
        </div>
      ))}
       
            </div>
          </div>
        </div>
      </div>
    </>
  );
}