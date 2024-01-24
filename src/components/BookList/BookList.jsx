import React, { useState, useEffect } from 'react';
import './BookList.css';
import { API_URL } from '../../API';
import axios from 'axios';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [selectedGenre, setSelectedGenre] = useState('All');

    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
    const navigate = useNavigate();

    const favoritesChecker = (id) => {
        const boolean = favorites.some((book) => book.id === id);
        return boolean;
    };

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => {
                console.log(res.data);
                setBooks(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter books based on search query and selected genre
    const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check if the selected genre is 'All' or if the book's genres include the selected genre
    const matchesGenre =
        selectedGenre === 'All' || book.genres.includes(selectedGenre);

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
            <input
                type="text"
                placeholder="Поиск по названию книги"
                value={searchQuery}
                onChange={handleSearch}
            />
            <label>Filter by Genre:</label>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            {genres.map((genre) => (
                <option key={genre} value={genre}>
                {genre}
                </option>
            ))}
            </select>
            <div className='book-container'>
                {filteredBooks.map((book) => (
                    <div key={book.id} className='book'>
                        <div>
                            <h4>{book.title}</h4>
                        </div>
                        <div>
                            <img
                                src={book.image_url}
                                alt="#"
                                onClick={() => navigate(`/books/${book.id}`)}
                            />
                        </div>
                        <div>
                            {favoritesChecker(book.id) ? (
                                <button onClick={() => removeFromFavorites(book.id)}>
                                    Удалить из Избранных
                                </button>
                            ) : (
                                <button onClick={() => addToFavorites(book)}>
                                    Добавить в Избранные
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