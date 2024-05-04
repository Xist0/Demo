import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListBook() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Ошибка при получении списка книг:', error));
    }, []);

    const bookList = books.map((item) => (
        <div className='container-box' key={item.id}>
            <div className='box-img'>
                <img src={item.book_img} alt="" />
            </div>
            <div className="box-title">
                <h1>{item.book_name} </h1>
                <div className="box-description">
                    <h2>{item.book_description}</h2>
                </div>
            </div>
            <Link to={`/book/${item.id}`}> <button>Подробнее</button></Link>
        </div>
    ));

    return (
        <div className="box">
            {bookList}
        </div>
    );
}

export default ListBook;
