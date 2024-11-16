var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import FormValidator from "../backend/utils/FormValidator.js";
document.addEventListener("DOMContentLoaded", () => {
    const validator = new FormValidator("bookForm");
    const form = document.getElementById("bookForm");
    if (form) {
        form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(form);
            const bookData = {
                title: formData.get('title'),
                author: formData.get('author'),
                publication_year: parseInt(formData.get('publication_year')),
                genre: formData.get('genre'),
                available: true
            };
            const response = yield fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });
            if (response.ok) {
                window.location.href = 'booksManagement.html';
            }
            else {
                const errorData = yield response.json();
                console.error("Error al registrar el libro:", errorData.message);
                const errorElement = document.getElementById('errorMessage');
                if (errorElement) {
                    errorElement.textContent = errorData.message || "Error al registrar el libro";
                }
            }
        }));
    }
});
