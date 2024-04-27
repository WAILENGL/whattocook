import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FavouriteRecipes({ favourites, setFavourites }) {


  useEffect(() => {
    async function fetchFavourites() {
      try {
        const response = await fetch(
          'https://api.airtable.com/v0/appuYbPHjZGoIMUna/Table%201',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer pataLVU90Nitd5Zlf.cac2198f3be43e7dfa6b0cff6ef0fc36edf1e96195e9fd931963957f48bf47c8'
            },
          }
          
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setFavourites(data.records);
        console.log(data)
      } catch (error) {
        console.log(error.message);
      }
      }
    fetchFavourites();
  }, []);


  return (
    <>
      <div className="container mt-5 fixed-top">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mt-4 mb-4">Your Favourite Recipes</h2>
          </div>
        </div>
        <div className="row">
          {favourites.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <Link to={`/recipe/${recipe.fields.recipeid}`} className="card mb-4">
                <img src={recipe.fields.image} className="card-img-top" alt={recipe.fields.title} />         
                      <div className="card-body">
               <h5 className="card-title" style={{ height: '35px', textAlign: "center"}} >{recipe.fields.title}</h5>
              </div>
             </Link>
           </div>
       ))}
        </div>
      </div>
    </>
  );
}
