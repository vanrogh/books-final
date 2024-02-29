import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from '../../API';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/actions';
import NotFound from '../NotFound/NotFound';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!/^\d+$/.test(id) || parseInt(id, 10) > 50) {
    return <NotFound />;
  }

  const favoritesChecker = (id) => {
    return favorites.some((book) => book.id === id);
  };

  return (
    <div className='book-details'>
      <div className='book-image'>
        <h2>{book.title}</h2>
        <img src={book.image_url} alt="#" />
      </div>
      <div className='book-description'>
        <h2>Description</h2>
        <p>{book.description}</p>
        <h2>Authors</h2>
        <p>{book.authors}</p>
        <h2>Genres</h2>
        <p>{book.genres}</p>
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
    </div>
  );
};

export default BookDetails;
