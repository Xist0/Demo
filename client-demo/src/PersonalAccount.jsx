import React, { useState, useEffect } from "react";
import Navigate from "./components/Navigate";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "./components/redux/authSlice";
import { addBook } from "./components/redux/addBook";

function PersonalAccount() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.name);
  const userRole = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const [userBooks, setUserBooks] = useState([]);

  const [bookData, setBookData] = useState({
    bookName: "",
    bookDescription: "",
    bookImg: "",
    bookFile: "",
  });

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user books");
        }
        const data = await response.json();
        const filteredBooks = data.filter(
          (book) => book.book_avtor === userName
        );
        setUserBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching user books:", error);
      }
    };
    fetchUserBooks();
  }, [userName, token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    setBookData({
      ...bookData,
      bookImg: file,
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/books/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update book status");
      }
      const updatedBooks = userBooks.map((book) => {
        if (book.id === id) {
          return { ...book, book_state: newStatus };
        }
        return book;
      });
      setUserBooks(updatedBooks);
    } catch (error) {
      console.error("Error updating book status:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setBookData({
      ...bookData,
      bookFile: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        bookName: bookData.bookName,
        bookDescription: bookData.bookDescription,
        bookImg: bookData.bookImg ? `/src/img/${bookData.bookImg.name}` : "",
        bookFile: bookData.bookFile ? `/pdf/${bookData.bookFile.name}` : "",
        bookAvtor: userName,
      };

      const response = await addBook(formData, token);
      console.log("Response:", response);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const renderBookStatus = (status) => {
    let color;
    switch (status) {
      case "Ожидает":
        color = "yellow";
        break;
      case "Отказана":
        color = "red";
        break;
      case "Одобрена":
        color = "green";
        break;
      default:
        color = "white";
    }
    return {
      backgroundColor: color,
    };
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
                dispatch(logOut());
              }}
            >
              Выйти
            </button>
          </div>
        </div>
        <div className="account-container-personal">
          <h1>Добавить книгу</h1>
          <div className="accountpersonal">
            <input
              type="text"
              name="bookName"
              value={bookData.bookName}
              onChange={handleInputChange}
              placeholder="Название"
            />
            <textarea
              name="bookDescription"
              value={bookData.bookDescription}
              onChange={handleInputChange}
              placeholder="Описание"
            />
            <input type="file" name="bookImg" onChange={handleImgChange} />
            <input type="file" name="bookFile" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Add Book</button>
          </div>
        </div>
        <div className="book_list">
          {userBooks.map((book) => (
            <div className="container-box" key={book.id}>
              <div className="box-img">
                <img src={book.book_img} alt="" />
              </div>
              <div className="box-title">
                <h1>{book.book_name} </h1>
                <div className="box-description">
                  <h2>{book.book_description}</h2>
                </div>
              </div>
              {userRole === "USER" ? (
                <div style={renderBookStatus(book.book_state)}>
                  <h3>{book.book_state}</h3>
                </div>
              ) : (
                <div className="admin-buttons">
                  <button
                    onClick={() => handleStatusChange(book.id, "Одобрена")}
                  >
                    Принять
                  </button>
                  <button
                    onClick={() => handleStatusChange(book.id, "Отказана")}
                  >
                    Отклонить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PersonalAccount;
