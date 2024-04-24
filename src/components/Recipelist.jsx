import React, { useState, useEffect } from 'react';

export default function Recipelist(){



  return (

<div>
<h2>Recipes</h2>
{recipes.map((recipe) => (
  <div key={recipe.id}>
    <h3>{recipe.title}</h3>
    <img src={recipe.image} alt={recipe.title} />
   {/*  recipe url structure */}
  </div>
))}
</div>

   
  );
};
}
