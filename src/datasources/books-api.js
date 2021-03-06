const { RESTDataSource } = require("apollo-datasource-rest");
// const { request, gql } = require("graphql-request");
const Contentstack = require("contentstack");
require("dotenv").config();

// Initialize the Contentstack Stack
const Stack = Contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
});

class BooksAPI extends RESTDataSource {
  constructor() {
    super();
    // the Catstronauts catalog is hosted on this server
    // this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  getMultipleItems(type, filterTitle = "title", filterParam) {
    const Query = Stack.ContentType(type).Query();

    return Query.where(filterTitle, filterParam)
      .includeSchema()
      .includeCount()
      .toJSON()
      .find()
      .then(
        function success(result) {
          console.log("-----------MULTIPLE_ITEM_QUERY");
          // console.log(result[0]);
          return result[0];
        },
        function error(err) {
          console.log("-----------MULTIPLE_ITEM_QUERY__ERROR", err);
          return err;
        }
      );
  }

  getSingleItem(type, uid) {
    const Query = Stack.ContentType(type).Entry(uid);

    return Query.fetch().then(
      function success(entry) {
        console.log("-----------SINGLE_ITEM_QUERY");
        console.log(entry.get("title")); // Retrieve field value by providing a field's uid
        // console.log("!!!!!!!!!!!ENTRY", entry.toJSON());
        return entry.toJSON();
      },
      function error(err) {
        console.log("-----------SINGLE_ITEM_QUERY__ERROR", err);
        return err;
      }
    );
  }

  // getArrayOfItems(type, uid) {
  //   const Query = Stack.ContentType(type).Entry(uid);

  //   return Query.fetch().then(
  //     function success(entry) {
  //       console.log("-----------SINGLE_ITEM_QUERY");
  //       console.log(entry.get("title")); // Retrieve field value by providing a field's uid
  //       // console.log(entry.toJSON()); // Convert the entry result object to JSON
  //       console.log("!!!!!!!!!!!ENTRY", entry.toJSON());
  //       const arr = [];
  //       return [entry.toJSON()];
  //     },
  //     function error(err) {
  //       console.log("ERROR", err);
  //       return err;
  //     }
  //   );
  // }
}

module.exports = BooksAPI;
