async function loadBookData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        document.getElementById('errorMessage').textContent = 'ID de libro no proporcionado';
        return;
    }

    try {
        const response = await axios.get(`/api/books/${id}`);
        if (response.data.success) {
            const book = response.data.book;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('publication_year').value = book.publication_year;
            document.getElementById('genre').value = book.genre;
            document.getElementById('available').checked = book.available;
        } else {
            document.getElementById('errorMessage').textContent = 'Error al cargar los datos del libro';
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'Error al conectar con el servidor';
    }
}

document.getElementById('updateBookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        document.getElementById('errorMessage').textContent = 'ID de libro no proporcionado';
        return;
    }

    try {
        const bookData = {
            title: document.getElementById('title').value.trim(),
            author: document.getElementById('author').value.trim(),
            publication_year: parseInt(document.getElementById('publication_year').value),
            genre: document.getElementById('genre').value.trim(),
            available: document.getElementById('available').checked
        };

        const response = await axios.put(`/api/books/${id}`, bookData);
        
        if (response.data.success) {
            document.getElementById('successMessage').textContent = 'Libro actualizado correctamente';
            document.getElementById('errorMessage').textContent = '';
            
            setTimeout(() => {
                window.location.href = 'booksManagement.html';
            }, 2000);
        } else {
            document.getElementById('errorMessage').textContent = response.data.message || 'Error al actualizar el libro';
            document.getElementById('successMessage').textContent = '';
        }
    } catch (error) {
        console.error('Error al actualizar:', error);
        document.getElementById('errorMessage').textContent = 'Error al conectar con el servidor';
        document.getElementById('successMessage').textContent = '';
    }
});

document.addEventListener('DOMContentLoaded', loadBookData);