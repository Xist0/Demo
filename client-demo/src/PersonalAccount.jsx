import React, { useState } from 'react';
import Navigate from './components/Navigate';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from './components/redux/authSlice';
import { addBook } from './components/redux/addBook';

function PersonalAccount() {

    const dispatch = useDispatch();
    const userName = useSelector(state => state.auth.name);
    const userRole = useSelector(state => state.auth.role);
    const token = useSelector(state => state.auth.token);

    const [bookData, setBookData] = useState({
        bookName: '',
        bookDescription: '',
        bookImg: '',
        bookFile: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleImgChange = (event) => {
        const file = event.target.files[0];
        setBookData({
            ...bookData,
            bookImg: file
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setBookData({
            ...bookData,
            bookFile: file
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                bookName: bookData.bookName,
                bookDescription: bookData.bookDescription,
                bookImg: bookData.bookImg ? `/src/img/${bookData.bookImg.name}` : '',
                bookFile: bookData.bookFile ? `/pdf/${bookData.bookFile.name}` : '',
                bookAvtor: userName // Добавляем имя пользователя в объект formData
            };

            const response = await addBook(formData, token);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <>
            <Navigate />
            <div className="container-main">
                <div className="account-container-personal">
                    <h1>Личный кабинет</h1>
                    <div className="accountpersonal">
                        <div className="container-name">
                            <h1>Имя</h1>
                            <h1>{userName}</h1>
                        </div>
                        <div className="container-name">
                            <h1>Роль</h1>
                            <h1>{userRole}</h1>
                        </div>
                        <button
                            onClick={() => {
                                dispatch(logOut())
                            }}
                        >Выйти</button>
                    </div>
                </div>
                <div className="account-container-personal">
                    <h1>Добавить книгу</h1>
                    <div className="accountpersonal">
                        <input type="text" name="bookName" value={bookData.bookName} onChange={handleInputChange} placeholder="Название" />
                        <textarea name="bookDescription" value={bookData.bookDescription} onChange={handleInputChange} placeholder="Описание" />
                        <input type="file" name="bookImg" onChange={handleImgChange} />
                        <input type="file" name="bookFile" onChange={handleFileChange} />
                        <button onClick={handleSubmit}>Add Book</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalAccount;
