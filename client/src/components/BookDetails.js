import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
    const { loading, data } = useQuery(getBookQuery, {
        variables: { id: bookId },
    });

    const displayBookDetails = () => {
        if (!loading) {
            const { book } = data;
            if (book) {
                return (
                    <div>
                        <h2>{book.name}</h2>
                        <p>{book.genre}</p>
                        <p>{book.author.name}</p>
                        <p>All books by this author:</p>
                        <ul className="other-books">
                            {book.author.books.map((item) => item.name)}
                        </ul>
                    </div>
                );
            } else {
                return <div>No book selected</div>;
            }
        }
    };

    return (
        <div id="book-details">
            <p>{displayBookDetails()}</p>
        </div>
    );
};

export default BookDetails;
