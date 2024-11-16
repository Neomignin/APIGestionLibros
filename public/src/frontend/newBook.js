document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        const bookData = {
            title: document.getElementById('title').value.trim(),
            author: document.getElementById('author').value.trim(),
            publication_year: parseInt(document.getElementById('publication_year').value),
            genre: document.getElementById('genre').value.trim()
        };

        const response = await axios.post('/api/books', bookData);
        
        if (response.data.success) {
            successMessage.textContent = 'Libro creado correctamente';
            errorMessage.textContent = '';
            
            setTimeout(() => {
                window.location.href = 'booksManagement.html';
            }, 2000);
        } else {
            errorMessage.textContent = response.data.message;
            successMessage.textContent = '';
        }
    } catch (error) {
        errorMessage.textContent = 'Error al crear el libro';
        successMessage.textContent = '';
    }
});
