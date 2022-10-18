const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query to get all books"
    allBooks: [Book!]!
    "Fetch a specific book, provided a book's URL"
    book(url: String!): Book!
    "Fetch Author"
    authorData(id: ID!): Author!
    "Homepage of the site"
    homepage: Homepage!
  }

  type Homepage {
    "Title of the Homepage"
    title: String!
    "Books section"
    books_section: Books_section
    Header: Header_section
    Footer: Footer_section
  }

  type Header_section {
    logo: Logo!
    navigation_menu: Navigation_menu
  }

  type Footer_section {
    logo: Logo!
    copyright: String
    navigation_menu: Navigation_menu
  }

  type Logo {
    title: String!
    url: String!
  }

  type Navigation_menu {
    title: String
    navigation_menu_items: [Navigation_menu_items!]!
  }

  type Books_section {
    title: String!
  }

  type Navigation_menu_items {
    label: String!
    page_reference: Navigation_menu_page_reference!
  }

  type Navigation_menu_page_reference {
    uid: String!
    title: String!
  }

  type Book {
    "Book's id"
    uid: String!
    "The books's title"
    title: String!
    "The book's URL"
    url: String!
    "The book's rating"
    rating: Int
    "Type of book illustrations. Could be colored or blach and white"
    illustrations: String
    "The book's author"
    authorData: Author!
    genre: [Genre!]
    "Imgaes of the book"
    images: [Image!]
    "Locale"
    locale: String
    "Number of book's pages"
    number_of_pages: Int
    "Publishing House of the Book"
    publishing_house: Publishing_house!
    "The Year, when the book was published first"
    publishing_year: String
    suggested_year: Int
    description: Book_description!
  }

  "Publishing house of the book"
  type Publishing_house {
    title: String
    descriptionText: String
    logo: Publishing_house_logo
  }

  "Publishing house logos"
  type Publishing_house_logo {
    "Title of the logo image"
    title: String
    "Type of the logo image"
    content_type: String
    "Url of the logo image"
    url: String
  }

  "Description of the book"
  type Book_description {
    text: String
  }

  "Author of a book"
  type Author {
    "Author's id"
    uid: String!
    "Author's name"
    title: String
    "Author's date of birth"
    date_of_birth: String
    "Author's date of death, if exist"
    date_of_death: String
  }

  "Genre of a book"
  type Genre {
    "Genre's title"
    title: String
  }

  "Images of the book"
  type Image {
    "Id of the image"
    uid: String
    "Title of the image"
    title: String
    "Type of the image"
    content_type: String
    "Url of the image"
    url: String
  }
`;

module.exports = typeDefs;
