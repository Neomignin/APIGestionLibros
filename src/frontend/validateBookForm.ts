import FormValidator from "../backend/utils/FormValidator.js";

document.addEventListener("DOMContentLoaded", () => {
    const validator = new FormValidator("bookForm");

    const form = document.getElementById("bookForm") as HTMLFormElement | null;
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); 

            const formData = new FormData(form);
            const bookData = {
                title: formData.get('title'),
                author: formData.get('author'),
                publication_year: parseInt(formData.get('publication_year') as string),
                genre: formData.get('genre'),
                available: true
            };

            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                window.location.href = 'booksManagement.html';
            } else {
                const errorData = await response.json();
                console.error("Error al registrar el libro:", errorData.message);
                const errorElement = document.getElementById('errorMessage');
                if (errorElement) {
                    errorElement.textContent = errorData.message || "Error al registrar el libro";
                }
            }
        });
    }
});