const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const BooksAPI = require("./datasources/books-api");
require("dotenv").config();

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
}

startApolloServer(typeDefs, resolvers);
