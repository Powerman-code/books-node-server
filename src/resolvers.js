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

    //get Homepage
    homepage: async (_, { id }, { dataSources }) => {
      const data = await dataSources.booksAPI.getMultipleItems("home_page");
      // console.log(data);
      let formetedData = {};
      data[0].homepage_components.map((item) => {
        // console.log("ITEM", item);
        Object.assign(formetedData, item);
      });
      // console.log("_______FD", formetedData);
      return { ...data[0], ...formetedData };
    },
  },

  Footer_section: {
    navigation_menu: async ({ navigation_menu }, _, { dataSources }) => {
      const data = await dataSources.booksAPI.getSingleItem(
        navigation_menu[0]._content_type_uid,
        navigation_menu[0].uid
      );
      // console.log("!!!!!!!!! NAV MENU", data.navigation_menu_items[0]);
      return data;
    },
  },

  Header_section: {
    navigation_menu: async ({ navigation_menu }, _, { dataSources }) => {
      const data = await dataSources.booksAPI.getSingleItem(
        navigation_menu[0]._content_type_uid,
        navigation_menu[0].uid
      );
      // console.log("!!!!!!!!! NAV MENU", data.navigation_menu_items[0]);
      return data;
    },
  },

  Navigation_menu_items: {
    page_reference: async ({ page_reference }, _, { dataSources }) => {
      const data = await dataSources.booksAPI.getSingleItem(
        page_reference[0]._content_type_uid,
        page_reference[0].uid
      );
      // console.log("!!!!!!!!! PAGE_reference", data);
      return data;
    },
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

    description: (parent) => {
      console.log("PARENT", parent?.book_description);
      return {
        text:
          parent?.book_description?.children[0].children[0]?.text ||
          "no description",
      };
    },

    genre: ({ genre }, _, { dataSources }) => {
      const data = dataSources.booksAPI.getMultipleItems(
        genre[0]._content_type_uid,
        "uid",
        genre[0].uid
      );
      return data;
    },

    //TODO: Clear unused args, and check

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
        // console.log("child", child?.children[0]?.text);
        text = child?.children[0]?.text;
      });
      const formatedData = { ...data, descriptionText: text };

      return formatedData;
    },
  },
};

module.exports = resolvers;
