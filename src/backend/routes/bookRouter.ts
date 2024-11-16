import Express from 'express';
import { Book } from '../types/Book.js';
import { getBooks, getBook, createBook, modifyBook, removeBook } from '../controllers/bookController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { CustomError } from '../types/CustomError.js';

const bookRouter = Express.Router();

bookRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getBooks();
    if (result.success) {
        res.json(result);
    } else {
        res.status(500).json(result);
    }
});

bookRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getBook(req.params.id);
    if (result.success) {
        res.json(result);
    } else {
        res.status(404).json(result);
    }
});

bookRouter.post("/", async (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> => {
    try {
        const requiredFields = ['title', 'author', 'publication_year', 'genre'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            const error: CustomError = new Error(`Faltan campos requeridos: ${missingFields.join(', ')}`);
            error.statusCode = 400;
            throw error;
        }

        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            publication_year: req.body.publication_year,
            genre: req.body.genre,
            available: true
        };

        const result = await createBook(book);
        
        if (result.success) {
            res.status(201).json(result);
        } else {
            throw new Error(result.message);
        }
    } catch (error: any) {
        next(error);
    }
});

bookRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response): Promise<void> => {
    try {
        const requiredFields = ['title', 'author', 'publication_year', 'genre', 'available'];
        const missingFields = requiredFields.filter(field => req.body[field] === undefined);
        
        if (missingFields.length > 0) {
            res.status(400).json({
                success: false,
                message: `Faltan campos requeridos: ${missingFields.join(', ')}`
            });
            return;
        }

        const book: Book = {
            title: req.body.title,
            author: req.body.author,
            publication_year: req.body.publication_year,
            genre: req.body.genre,
            available: req.body.available
        };

        const result = await modifyBook(req.params.id, book);
        
        if (result.success) {
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Error al actualizar el libro"
        });
    }
});

bookRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await removeBook(req.params.id);
    if (result.success) {
        res.json(result);
    } else {
        res.status(404).json(result);
    }
});

export default bookRouter;