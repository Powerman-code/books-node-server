const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const BooksAPI = require("./datasources/books-api");
require("dotenv").config();
const Contentstack = require("contentstack");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // introspection: process.env.NODE_ENV !== "production",
    introspection: true,
    dataSources: () => {
      return {
        booksAPI: new BooksAPI(),
      };
    },
  });

  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
          `);

  // const Stack = Contentstack.Stack({
  //   api_key: process.env.REACT_APP_APIKEY,
  //   delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  //   environment: process.env.REACT_APP_ENVIRONMENT,
  //   // region: process.env.REACT_APP_REGION,
  // });

  // const Query = Stack.ContentType("author").Entry("blt9be42f11661f232c");

  // Query.fetch().then(
  //   function success(entry) {
  //     console.log("-----------second");
  //     console.log(entry.get("title")); // Retrieve field value by providing a field's uid
  //     console.log(entry.toJSON()); // Convert the entry result object to JSON
  //   },
  //   function error(err) {
  //     // err object
  //   }
  // );
}

startApolloServer(typeDefs, resolvers);
