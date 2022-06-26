const { RESTDataSource } = require("apollo-datasource-rest");
// const { request, gql } = require("graphql-request");
const Contentstack = require("contentstack");
require("dotenv").config();

// Initialize the Contentstack Stack
const Stack = Contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  // region: process.env.REACT_APP_REGION,
});

class BooksAPI extends RESTDataSource {
  constructor() {
    super();
    // the Catstronauts catalog is hosted on this server
    // this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  getBooks() {
    const Query = Stack.ContentType("book_details").Query();
    console.log(Query);

    return Query.where("title")
      .includeSchema()
      .includeCount()
      .toJSON()
      .find()
      .then(
        function success(result) {
          console.log("----------DATA", result[0]);
          return result[0];
          // result is array where -
          // result[0] =&gt; entry objects
          // result[result.length-1] =&gt; entry objects count included only when .includeCount() is queried.
          // result[1] =&gt; schema of the content type is included when .includeSchema() is queried.
        },
        function error(err) {
          console.log("ERROR");
          console.log(err);
          return err;
          // err object
        }
      );
  }

  getAuthor(uid) {
    const Query = Stack.ContentType("author").Entry(uid);
    console.log("-----------first");

    return Query.fetch().then(
      function success(entry) {
        console.log("-----------second");
        console.log(entry.get("title")); // Retrieve field value by providing a field's uid
        console.log(entry.toJSON()); // Convert the entry result object to JSON
        return entry;
      },
      function error(err) {
        // err object
      }
    );
  }
}

module.exports = BooksAPI;
