import pool from "../config/configDb.js";
import { Book } from "../types/Book.js";

export async function getAllBooks(): Promise<any> {
    try {
        const result = await pool.query('SELECT * FROM book ORDER BY id ASC');
        return {
            success: true,
            books: result.rows
        };
    } catch (error) {
        return {
            success: false,
            message: `Error al obtener libros: ${(error as Error).message}`
        };
    }
}

export async function getBookById(id: string): Promise<any> {
    try {
        const result = await pool.query('SELECT * FROM book WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return {
                success: false,
                message: 'Libro no encontrado'
            };
        }
        return {
            success: true,
            book: result.rows[0]
        };
    } catch (error) {
        return {
            success: false,
            message: `Error al obtener el libro: ${(error as Error).message}`
        };
    }
}

export async function saveBook(book: Book): Promise<any> {
    try {
        const queryString = `
            INSERT INTO book (title, author, publication_year, genre, available)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [
            book.title,
            book.author,
            book.publication_year,
            book.genre,
            book.available ?? true // Valor por defecto true si no se especifica
        ];
        
        const result = await pool.query(queryString, values);
        return {
            success: true,
            book: result.rows[0]
        };
    } catch (error) {
        return {
            success: false,
            message: `Error al guardar el libro: ${(error as Error).message}`
        };
    }
}

export async function updateBook(id: string, book: Book): Promise<any> {
    try {
        const queryString = `
            UPDATE book 
            SET title = $1, 
                author = $2, 
                publication_year = $3, 
                genre = $4, 
                available = $5
            WHERE id = $6 
            RETURNING *
        `;
        const values = [
            book.title,
            book.author,
            book.publication_year,
            book.genre,
            book.available,
            id
        ];
        
        const result = await pool.query(queryString, values);
        return {
            success: true,
            book: result.rows[0]
        };
    } catch (error) {
        return {
            success: false,
            message: `Error al actualizar el libro: ${(error as Error).message}`
        };
    }
}

export async function deleteBook(id: string): Promise<any> {
    try {
        const result = await pool.query('DELETE FROM book WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return {
                success: false,
                message: 'Libro no encontrado'
            };
        }
        return {
            success: true,
            message: 'Libro eliminado correctamente'
        };
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar el libro: ${(error as Error).message}`
        };
    }
}  