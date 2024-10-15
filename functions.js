const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  return (bookFound = books.find((book) => book.id === bookId));
}
console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  return authors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );
}
console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  const newAuthorArray = authors.map((author) => {
    return {
      author: author.name,
      bookCount: author.books.length,
    };
  });
  return newAuthorArray;
}
console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  // Your code goes here
  books.forEach((book) => {
    return (colors[book.color] = book.title);
  });

  return colors;
}
console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  const arrayOfTitles = [];
  const myAuthor = getAuthorByName(authorName, authors);
  myAuthor.books.forEach((book) => {
    const bookFound = getBookById(book, books);
    arrayOfTitles.push(bookFound.title);
  });
  return arrayOfTitles;
}
console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let mostBooks = authors[0];
  authors.forEach((author) => {
    if (author.books.length > mostBooks.books.length) mostBooks = author;
  });
  return mostBooks.name;
}
console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let arrayOfTitles = [];
  authors.forEach((author) => {
    if (author.books.some((book) => book === bookId))
      arrayOfTitles = arrayOfTitles.concat(
        titlesByAuthorName(author.name, authors, books)
      );
  });
  arrayOfTitles = [...new Set(arrayOfTitles)];
  return arrayOfTitles;
}
console.log(relatedBooks(46, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // (Needed a little chatgpt help with this one)
  // Your code goes here
  counter = [];
  authors.forEach((author) => {
    const coAuthoredCount = author.books.length;
    counter.push({
      name: author.name,
      count: coAuthoredCount,
    });
  });

  let mostCoAuthored = 0;
  let friendliestAuthor = "";

  counter.map((author) => {
    if (author.count > mostCoAuthored) {
      mostCoAuthored = author.count;
      friendliestAuthor = author.name;
    }
  });
  return friendliestAuthor;
}

console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
