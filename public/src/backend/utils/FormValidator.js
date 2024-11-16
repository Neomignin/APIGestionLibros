var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FormValidator {
    constructor(formId) {
        this.form = document.querySelector(`#${formId}`);
        this.errorMessages = new Map();
        this.initializeValidation();
    }
    initializeValidation() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        const inputs = this.form.querySelectorAll('input');
    }
    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        switch (fieldName) {
            case 'title':
                return this.validateTitle(value);
            case 'author':
                return this.validateAuthor(value);
            case 'publication_year':
                return this.validatePublicationYear(value);
            case 'genre':
                return this.validateGenre(value);
            default:
                return true;
        }
    }
    validateTitle(value) {
        if (value.length < 1) {
            this.showError('title', 'El título no puede estar vacío');
            return false;
        }
        this.removeError('title');
        return true;
    }
    validateAuthor(value) {
        if (value.length < 1) {
            this.showError('author', 'El autor no puede estar vacío');
            return false;
        }
        this.removeError('author');
        return true;
    }
    validatePublicationYear(value) {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1000 || year > currentYear) {
            this.showError('publication_year', `El año debe estar entre 1000 y ${currentYear}`);
            return false;
        }
        this.removeError('publication_year');
        return true;
    }
    validateGenre(value) {
        if (value.length < 1) {
            this.showError('genre', 'El género no puede estar vacío');
            return false;
        }
        this.removeError('genre');
        return true;
    }
    showError(fieldName, message) {
        var _a, _b;
        const input = this.form.querySelector(`#${fieldName}-field`);
        let errorDiv = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.classList.add('error');
        this.errorMessages.set(fieldName, message);
    }
    removeError(fieldName) {
        var _a;
        const input = this.form.querySelector(`#${fieldName}-field`);
        const errorDiv = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
        this.errorMessages.delete(fieldName);
    }
    handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const inputs = this.form.querySelectorAll('input');
            let isValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            if (isValid) {
                try {
                    const formData = new FormData(this.form);
                    const response = yield fetch(this.form.action, {
                        method: this.form.method,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: formData.get('title'),
                            author: formData.get('author'),
                            publication_year: parseInt(formData.get('publication_year')),
                            genre: formData.get('genre')
                        }),
                    });
                    if (response.ok) {
                        window.location.href = 'booksManagement.html';
                    }
                    else {
                        const errorData = yield response.json();
                        console.error("Error al registrar el libro:", errorData.message);
                        this.showError('form', errorData.message || "Error al registrar el libro");
                    }
                }
                catch (error) {
                    console.error("Error al enviar el formulario:", error);
                    this.showError('form', "Error al enviar el formulario");
                }
            }
        });
    }
}
export default FormValidator;
