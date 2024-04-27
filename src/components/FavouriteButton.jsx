import React from 'react';

export default function FavouriteButton({ isFavourite, onClick }) {
  return (
    <button type="button" onClick={onClick} className="btn btn-primary mb-3">
      {isFavourite ? 'Recipe In Favourites' : 'Add to Favourites'}
    </button>
  );
}
