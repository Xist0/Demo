import { sql } from "../db.js";
export const addBook = async (req, res) => {
    try {
        const { bookName, bookDescription, bookImg, bookFile, bookAvtor } = req.body;

        if (!bookName || !bookDescription || !bookImg || !bookFile || !bookAvtor) {
            throw new Error("Все поля формы должны быть заполнены");
        }
        const userQuery = await sql`SELECT name FROM Users WHERE name = ${bookAvtor}`;

        if (!userQuery || userQuery.length === 0) {
            throw new Error("Пользователь не найден");
        }

        const userNameFromQuery = userQuery[0].name;

        const existingBook = await sql`SELECT * FROM Books WHERE book_name = ${bookName}`;
        if (existingBook.length > 0) {
            throw new Error("Книга уже существует");
        }

        await sql`
        INSERT INTO Books (book_name, book_description, book_img, book_file, book_avtor)
        VALUES (${bookName}, ${bookDescription}, ${bookImg}, ${bookFile}, ${userNameFromQuery})
    `;
        console.log('FormData:', req.body);
        if (!bookName || !bookDescription || !bookImg || !bookFile || !bookAvtor) {
            throw new Error("Все поля формы должны быть заполнены");
        } res.status(200).json({ message: 'Книга успешно добавлена' });
    } catch (error) {
        console.error('Ошибка при добавлении книги:', error);
        res.status(500).json({ error: 'Не удалось добавить книгу' });
    }
};
