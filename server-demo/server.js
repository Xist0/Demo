import express from "express";
import { sql } from "./Server/db.js";
import { register } from "./Server/comtonent/register.js";
import { auth } from "./Server/comtonent/auth.js";
import { roleMiddleware } from "./Server/middlewares/roleMiddleware.js";
import { addBook } from "./Server/comtonent/addBook.js";
import cors from 'cors'

const PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

app.post('/reg', register)
app.post('/auth', auth)
app.use('/addBook', addBook);
app.get('/books', async (req, res) => {
    try {
        const books = await sql`SELECT * FROM Books`;
        res.json(books);
    } catch (error) {
        console.error('Ошибка при получении списка книг:', error);
        res.status(500).json({ error: 'Не удалось получить список книг' });
    }
});
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await sql`SELECT * FROM Books WHERE id = ${id}`;
        if (!book || book.length === 0) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        res.json(book[0]);
    } catch (error) {
        console.error('Ошибка при получении информации о книге:', error);
        res.status(500).json({ error: 'Не удалось получить информацию о книге' });
    }
});
const start = async () => {

    // создаем таблицы
    // await sql`create table if not exists Roles(
    //     role varchar(100) unique primary key
    // )`
    // await sql`DROP TABLE IF EXISTS Users`;
    // await sql`create table if not exists Users(
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     name  varchar(100) UNIQUE NOT NULL, 
    //     role varchar(100),
    //     password varchar(100),
    //     FOREIGN KEY (role) REFERENCES Roles(role)
    
    // )`

    // const existingType = await sql`SELECT 1 FROM pg_type WHERE typname = 'book_state_enum'`;
    // if (existingType.length === 0) {
    //     await sql`CREATE TYPE book_state_enum AS ENUM ('Ожидает', 'Принята', 'Отказана')`;
    // }

    // Создаем таблицу Books
    // await sql`CREATE TABLE IF NOT EXISTS Books(
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     book_name VARCHAR(255) NOT NULL,
    //     book_description VARCHAR(255) NOT NULL,
    //     book_img VARCHAR(255) NOT NULL,
    //     book_file VARCHAR(255) NOT NULL,
    //     book_state book_state_enum DEFAULT 'Ожидает',
    //     book_avtor VARCHAR(100) NOT NULL, -- Имя пользователя
    //     FOREIGN KEY (book_avtor) REFERENCES Users(name) -- Ссылка на таблицу Users по имени пользователя
    // )`;
    // запустить в первый раз и больше не запускать
    // чтобы добавить роли в таблицу ролей

    // await sql`insert into Roles(role) values('USER')`
    // await sql`insert into Roles(role) values('ADMIN')`

    //запустить сервак
    //(прослушивать порт на запросы)
    //вторым аргументом функция которая запустится при успешном запуске сервака
    app.listen(PORT, () => {
        console.log(`СЕРВАК Пашет ТУТ http://localhost:${PORT}`);
    })
}

start()