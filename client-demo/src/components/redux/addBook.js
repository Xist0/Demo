
const addBook = async (formData, token) => {
    try {
        const response = await fetch('http://localhost:5000/addBook', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Указываем тип контента как JSON
            },
            body: JSON.stringify(formData) // Преобразуем объект в JSON
        });
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export { addBook };
