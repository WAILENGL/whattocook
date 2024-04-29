import React from 'react';

export default function FavouriteButton({ isFavourite, onClick }) {
	return (
		<button type="button" onClick={onClick} className="btn btn-primary">
			{isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
		</button>
	);
}
