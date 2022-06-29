const resolvers = {
  Query: {
    //get books
    allBooks: async (_, __, { dataSources }) => {
      const data = await dataSources.booksAPI.getMultipleItems("book_details");
      return data;
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
      const data = dataSources.booksAPI.getSingleItem(
        author[0]._content_type_uid,
        author[0].uid
      );
      return data;
    },

    genre: ({ genre }, _, { dataSources }) => {
      const data = dataSources.booksAPI.getMultipleItems(
        genre[0]._content_type_uid,
        "uid",
        genre[0].uid
      );
      return data;
    },

    images: async ({ group }, _, { dataSources }) => {
      return group.map((i) => i.image);
    },

    publishing_house: async ({ publishing_house }, _, { dataSources }) => {
      const data = await dataSources.booksAPI.getSingleItem(
        publishing_house[0]._content_type_uid,
        publishing_house[0].uid
      );
      let text = "";
      data.description.children.map((child) => {
        console.log("child", child?.children[0]?.text);
        text = child?.children[0]?.text;
      });
      const formatedData = { ...data, descriptionText: text };

      return formatedData;
    },
  },
};

module.exports = resolvers;
