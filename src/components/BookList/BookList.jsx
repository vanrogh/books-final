import React, { useState, useEffect } from 'react';
import './BookList.css';
import { API_URL } from '../../API';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const favoritesChecker = (id) => {
    return favorites.some((book) => book.id === id);
  };

  // Filter and map books
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className='book-list'>
      <div className='filter'>
        <input
          type="text"
          placeholder="Search by book title"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className='book-container'>
        {filteredBooks.map((book) => (
          <div key={book.id} className='book'>
            <div>
              <h4>{book.title}</h4>
            </div>
            <div>
              <img src={book.image_url} alt="#" onClick={() => navigate(`/books/${book.id}`)} />
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
        ))}
      </div>
    </div>
  );
};

export default BookList;
