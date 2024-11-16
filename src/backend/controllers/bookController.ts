import { Book } from "../types/Book.js";
import { getAllBooks, getBookById, saveBook, updateBook, deleteBook } from "../models/bookModel.js";

export async function getBooks(): Promise<any> {
    return await getAllBooks();
}

export async function getBook(id: string): Promise<any> {
    return await getBookById(id);
}

export async function createBook(book: Book): Promise<any> {
    return await saveBook(book);
}

export async function modifyBook(id: string, book: Book): Promise<any> {
    return await updateBook(id, book);
}

export async function removeBook(id: string): Promise<any> {
    return await deleteBook(id);
}