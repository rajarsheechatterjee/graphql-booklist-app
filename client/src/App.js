import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

/**
 * Apollo Client Setup
 */
const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Ninja's Reading List</h1>
                <BookList />
                <AddBook />
            </div>
        </ApolloProvider>
    );
};

export default App;
