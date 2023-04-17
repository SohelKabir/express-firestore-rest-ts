import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { Book, BookData } from './models/book';
import morgan from 'morgan';

// Create an Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// Get all books
app.get('/books', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.getAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Get a book by ID
app.get(
  '/books/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.getById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Create a new book
app.post(
  '/books',
  async (req: Request<{}, {}, BookData>, res: Response, next: NextFunction) => {
    try {
      const book = new Book(req.body);
      const savedBook = await book.save();
      res.status(201).json(savedBook);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Update a book by ID
app.put(
  '/books/:id',
  async (
    req: Request<{ id: string }, {}, BookData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const book = await Book.getById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
      }
      const updatedBook = await book.update(req.body);
      res.status(200).json(updatedBook);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete a book by ID
app.delete(
  '/books/:id',
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const book = await Book.getById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
      }
      await book.delete();
      res.json(book);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
