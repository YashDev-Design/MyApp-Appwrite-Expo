// contexts/useBooksContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID, ID } from "../lib/appwrite";

const BooksContext = createContext(null);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [booksError, setBooksError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoadingBooks(true);
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setBooks(res.documents);
    } catch (err) {
      setBooksError(err.message);
    } finally {
      setLoadingBooks(false);
    }
  };

  const createBook = async (title, author) => {
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { title, author }
      );
      setBooks((prev) => [doc, ...prev]);
    } catch (err) {
      setBooksError(err.message);
    }
  };

  const deleteBook = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setBooks((prev) => prev.filter((b) => b.$id !== id));
    } catch (err) {
      setBooksError(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        loadingBooks,
        booksError,
        createBook,
        deleteBook,
        fetchBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = () => useContext(BooksContext);
