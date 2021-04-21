const graphql = require("graphql");
const _ = require("lodash");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const books = [
    { name: "Harry Potter", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "Bunny Girl Senpai", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "Tomozaki Kun", genre: "Fantasy", id: "3", authorId: "3" },
    { name: "Yahari Ore No Seishun", genre: "Fantasy", id: "4", authorId: "2" },
    { name: "Attack On Titan", genre: "Fantasy", id: "5", authorId: "4" },
];

const authors = [
    { name: "JK Rowling", age: 30, id: "1" },
    { name: "Wataru Watari", age: 20, id: "2" },
    { name: "Osamu Dazai", age: 70, id: "3" },
    { name: "Hajime Isayama", age: 70, id: "4" },
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
