import React, { useState } from 'react';

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

  function handleRemove(index) {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  }

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          {ingredient}
          <button type="button" onClick={() => handleRemove(index)}>
          ❌
          </button>
        </li>
      ))}
    </ul>
  );
}