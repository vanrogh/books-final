import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from '../../API';
import NotFound from '../NotFound/NotFound';

const BookDetails = () => {

  const [ book, setBook ] = useState({});

  const { id } = useParams();

  useEffect(() => {
    // Проверяем, если id не состоит только из цифр, показываем NotFound.jsx
    if (!/^\d+$/.test(id)) {
      return;
    }

    // Проверяем, если id больше 50, показываем NotFound.jsx
    if (parseInt(id, 10) > 50) {
      return;
    }

    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Если id не состоит только из цифр, показываем NotFound.jsx
  if (!/^\d+$/.test(id)) {
    return <NotFound />;
  }

  // Если id больше 50, показываем NotFound.jsx
  if (parseInt(id, 10) > 50) {
    return <NotFound />;
  }

  return (
    <div className='book-details'>
      <div className='book-image'>
        <h2>{book?.title}</h2>
        <img src={book?.image_url} alt="#" />
      </div>
      <div className='book-description'>
        <h2>Description</h2>
        <p>{book?.description}</p>
        <h2>Authors</h2>
        <p>{book?.authors}</p>
        <h2>Genres</h2>
        <p>{book?.genres}</p>
      </div>
    </div>
  );
}

export default BookDetails