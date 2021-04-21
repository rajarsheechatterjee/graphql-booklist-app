import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

const BookList = () => {
    const { loading, data } = useQuery(getBooksQuery);
    const [selectedBook, setSelectedBook] = useState(null);

    const displayBooks = () => {
        if (loading) {
            return <div>Loading Books</div>;
        } else {
            return data.books.map((book) => (
                <li key={book.id} onClick={(e) => setSelectedBook(book.id)}>
                    {book.name}
                </li>
            ));
        }
    };

    return (
        <div>
            <ul id="book-list">{displayBooks()}</ul>
            <BookDetails bookId={selectedBook} />
        </div>
    );
};

export default BookList;
