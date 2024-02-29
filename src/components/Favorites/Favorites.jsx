import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/actions';
import './Favorites.css';

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const favoritesChecker = (id) => {
    return favorites.some((book) => book.id === id);
  };

  return (
    <div className='favorites'>
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <div key={book.id} className='book'>
            <div>
              <h4>{book.title}</h4>
            </div>
            <div>
              <img src={book.image_url} alt="#" />
            </div>
            <div>
              {favoritesChecker(book.id) ? (
                <button onClick={() => dispatch(removeFromFavorites(book.id))}>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => dispatch(addToFavorites(book))}>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>You don't have any favorite books yet!</h1>
      )}
    </div>
  );
};

export default Favorites;
