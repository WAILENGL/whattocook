import React from 'react';

export default function FavouriteButton({ isFavourite, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ margin: '10px' }} className="btn btn-primary">
      {isFavourite ? 'Recipe In Favourites' : 'Add to Favourites'}
    </button>
  );
}
