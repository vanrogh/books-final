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
  const [selectedGenre, setSelectedGenre] = useState('All'); // Добавлено состояние для выбранного жанра
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const favoritesChecker = (id) => {
    return favorites.some((book) => book.id === id);
  };

  // Фильтрация книг по жанру и поиск по названию
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Проверка, если жанр выбран как 'All' или жанр книги совпадает с выбранным жанром
    const matchesGenre = selectedGenre === 'All' || book.genres.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  const genres = [
    'All',
    'Fiction',
    'Fantasy',
    'Young Adult',
    'Science Fiction',
    'Dystopia',
    'Classics',
    'Historical Fiction',
    'Historical',
    'Academic',
    'School',
    'Romance',
    'Paranormal',
    'Vampires',
    'Politics',
    'Novels',
    'Read For School',
    'Childrens',
    'Humor',
    'Picture Books',
    'Gothic',
    'Thriller',
    'Mystery',
  ];

  return (
    <div className='book-list'>
      <div className='filter'>
        <input
            type="text"
            placeholder="Search by book title"
            value={searchQuery}
            onChange={handleSearch}
        />
        <label>Filter by Genre:</label>
        <select value={selectedGenre} onChange={handleGenreChange}>
            {genres.map((genre) => (
            <option key={genre} value={genre}>
                {genre}
            </option>
            ))}
        </select>
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
