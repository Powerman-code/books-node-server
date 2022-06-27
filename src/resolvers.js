const resolvers = {
  Query: {
    //get books
    allBooks: (_, __, { dataSources }) => {
      return dataSources.booksAPI.getMultipleItems("book_details");
    },

    //get specific book by id
    book: (_, { id }, { dataSources }) => {
      return dataSources.booksAPI.getSingleItem("book_details", id);
    },
    // author: (_, { id }, { dataSources }) => {
    //   // return dataSources.booksAPI.getTrack(id);
    // },
  },
  Book: {
    //get author of the book
    authorData: ({ author }, _, { dataSources }) => {
      console.log("----------P", author[0].uid);
      const data = dataSources.booksAPI.getSingleItem("author", author[0].uid);
      console.log("DATA", data);
      return data;
      // return dataSources.booksAPI.getAuthor(author[0].uid);
    },
  },
  // Author: {
  //   //get author of the book
  //   author: (p, _, { dataSources }) => {
  //     console.log("----------P", p);
  //     return dataSources.booksAPI.getAuthor("blt9be42f11661f232c");
  //   },
  // },
};

module.exports = resolvers;

// const resolvers = {
//   Query: {
//     //get books
//     allBooks: (_, __, { dataSources }) => {
//       return dataSources.booksAPI.getBooks();
//     },

//     //get specific book by id
//     book: (_, { id }, { dataSources }) => {
//       return dataSources.booksAPI.getBook(id);
//     },
//     // author: (_, { id }, { dataSources }) => {
//     //   // return dataSources.booksAPI.getTrack(id);
//     // },
//   },
//   Book: {
//     //get author of the book
//     authorData: ({ author }, _, { dataSources }) => {
//       console.log("----------P", author[0].uid);
//       const data = dataSources.booksAPI.getAuthor(author[0].uid);
//       console.log("DATA", data);
//       return data;
//       // return dataSources.booksAPI.getAuthor(author[0].uid);
//     },
//   },
//   // Author: {
//   //   //get author of the book
//   //   author: (p, _, { dataSources }) => {
//   //     console.log("----------P", p);
//   //     return dataSources.booksAPI.getAuthor("blt9be42f11661f232c");
//   //   },
//   // },
// };
