"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios.get("http://localhost:3000/api/books");
    let htmlBooks = `
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Año</th>
                    <th>Género</th>
                    <th>Disponible</th>
                    <th>Actualizar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
    `;
    result.data.books.forEach((book) => {
        htmlBooks += `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publication_year}</td>
                <td>${book.genre}</td>
                <td>${book.available ? 'Sí' : 'No'}</td>
                <td>
                    <img class="update-button" 
                         id="update-${book.id}" 
                         src="../../media/icon/lapiz.png" 
                         alt="Actualizar">
                </td>
                <td>
                    <img class="delete-button" 
                         id="delete-${book.id}" 
                         src="../../media/icon/basura.png" 
                         alt="Eliminar">
                </td>
            </tr>
        `;
    });
    htmlBooks += "</tbody></table>";
    document.getElementById("books").innerHTML = htmlBooks;
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
            if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
                const id = e.target.id.split("-")[1];
                try {
                    const result = yield axios.delete(`http://localhost:3000/api/books/${id}`);
                    if (result.data.success) {
                        location.reload();
                    }
                    else {
                        alert('Error al eliminar el libro: ' + result.data.message);
                    }
                }
                catch (error) {
                    alert('Error al eliminar el libro');
                }
            }
        }));
    });
    document.querySelectorAll(".update-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.target.id.split("-")[1];
            window.location.href = `updateBook.html?id=${id}`;
        });
    });
}));
