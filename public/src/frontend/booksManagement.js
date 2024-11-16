async function loadBooks() {
    try {
        const response = await axios.get('/api/books');
        if (response.data.success) {
            displayBooks(response.data.books);
        } else {
            document.getElementById('errorMessage').textContent = 'Error al cargar los libros';
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'Error al conectar con el servidor';
    }
}

function displayBooks(books) {
    const tableDiv = document.getElementById('booksTable');
    if (!books || books.length === 0) {
        tableDiv.innerHTML = '<p>No hay libros registrados</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Año</th>
                    <th>Género</th>
                    <th>Disponible</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    books.forEach(book => {
        html += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publication_year}</td>
                <td>${book.genre}</td>
                <td>
                    <button 
                        class="availability-toggle ${book.available ? 'available' : 'unavailable'}"
                        onclick="toggleAvailability(${book.id}, ${book.available})"
                    >
                        ${book.available ? 'Disponible' : 'No disponible'}
                    </button>
                </td>
                <td>
                    <img class="update-button" 
                         src="./media/icon/lapiz.png" 
                         alt="Actualizar"
                         onclick="editBook(${book.id})">
                    <img class="delete-button" 
                         src="./media/icon/basura.png" 
                         alt="Eliminar"
                         onclick="deleteBook(${book.id})">
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    tableDiv.innerHTML = html;
}

function editBook(id) {
    window.location.href = `updateBook.html?id=${id}`;
}

async function deleteBook(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) {
        return;
    }

    try {
        const response = await axios.delete(`/api/books/${id}`);
        if (response.data.success) {
            loadBooks();
        } else {
            alert('Error al eliminar el libro: ' + response.data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el libro');
    }
}

async function toggleAvailability(id, currentStatus) {
    try {
        const bookResponse = await axios.get(`/api/books/${id}`);
        if (!bookResponse.data.success) {
            throw new Error('Error al obtener datos del libro');
        }

        const book = bookResponse.data.book;
        
        const response = await axios.put(`/api/books/${id}`, {
            ...book,
            available: !currentStatus
        });
        
        if (response.data.success) {
            loadBooks();
        } else {
            alert('Error al cambiar la disponibilidad: ' + response.data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estado del libro');
    }
}

document.addEventListener('DOMContentLoaded', loadBooks); 