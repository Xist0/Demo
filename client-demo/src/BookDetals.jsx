import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigate from './components/Navigate';

function BookDetals() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleDownload = () => {
        if (book && book.book_file) {
            const downloadLink = document.createElement('a');
            downloadLink.href = book.book_file;
            downloadLink.download = `${book.book_name}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navigate />
            <div className="container-main">
                <div className="book-container-main">
                    <div className="book-Detals-img">
                        <img src={book.book_img} alt="" />
                        <h5>{book.book_avtor}</h5>
                    </div>
                    <div className="book-Detals-content">
                        <h1>{book.book_name}</h1>
                        <h3>{book.book_description}</h3>
                        <button onClick={handleDownload}>Скачать</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetals;
