interface BookFormData {
    title: string;
    author: string;
    publication_year: number;
    genre: string;
}

class FormValidator {
    private form: HTMLFormElement;
    private errorMessages: Map<string, string>;

    constructor(formId: string) {
        this.form = document.querySelector(`#${formId}`) as HTMLFormElement;
        this.errorMessages = new Map();
        this.initializeValidation();
    }

    private initializeValidation(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        const inputs = this.form.querySelectorAll('input');
    }

    private validateField(input: HTMLInputElement): boolean {
        const value = input.value.trim();
        const fieldName = input.name;
        
        switch(fieldName) {
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

    private validateTitle(value: string): boolean {
        if (value.length < 1) {
            this.showError('title', 'El título no puede estar vacío');
            return false;
        }
        this.removeError('title');
        return true;
    }

    private validateAuthor(value: string): boolean {
        if (value.length < 1) {
            this.showError('author', 'El autor no puede estar vacío');
            return false;
        }
        this.removeError('author');
        return true;
    }

    private validatePublicationYear(value: string): boolean {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        
        if (isNaN(year) || year < 1000 || year > currentYear) {
            this.showError('publication_year', `El año debe estar entre 1000 y ${currentYear}`);
            return false;
        }
        this.removeError('publication_year');
        return true;
    }

    private validateGenre(value: string): boolean {
        if (value.length < 1) {
            this.showError('genre', 'El género no puede estar vacío');
            return false;
        }
        this.removeError('genre');
        return true;
    }

    private showError(fieldName: string, message: string): void {
        const input = this.form.querySelector(`#${fieldName}-field`) as HTMLInputElement;
        let errorDiv = input.parentElement?.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement?.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.classList.add('error');
        this.errorMessages.set(fieldName, message);
    }

    private removeError(fieldName: string): void {
        const input = this.form.querySelector(`#${fieldName}-field`) as HTMLInputElement;
        const errorDiv = input.parentElement?.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
        this.errorMessages.delete(fieldName);
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input as HTMLInputElement)) {
                isValid = false;
            }
        });

        if (isValid) {
            try {
                const formData = new FormData(this.form);
                const response = await fetch(this.form.action, {
                    method: this.form.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: formData.get('title'),
                        author: formData.get('author'),
                        publication_year: parseInt(formData.get('publication_year') as string),
                        genre: formData.get('genre')
                    }),
                });

                if (response.ok) {
                    window.location.href = 'booksManagement.html';
                } else {
                    const errorData = await response.json();
                    this.showError('form', errorData.message || "Error al registrar el libro");
                }
            } catch (error) {
                this.showError('form', "Error al enviar el formulario");
            }
        }
    }
} 

export default FormValidator;