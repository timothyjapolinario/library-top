let newId = 0;
function Book(bookName, bookAuthor, hasRead) {
  this.bookId = newId;
  this.bookName = bookName;
  this.bookAuthor = bookAuthor;
  this.hasRead = hasRead;
  newId += 1;
}

export default Book;
