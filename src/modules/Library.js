import Book from "./Book";
import PubSub from "pubsub-js";
let myLibrary = new Map();
let bookContainer = document.querySelector(".list-books-container");
let addBookButton = document.querySelector(".button-add-book");
let isFormOpen = false;
let newBookForm = document.querySelector(".form-add-book-popup > form");
let submitNewBookButton = document.querySelector("#submit-new-book-button");

let bookName = document.querySelector("#new-book-name");
let bookAuthor = document.querySelector("#new-book-author");
let bookReadStatus = document.querySelector("#new-book-read-status");

function toggleForm() {
  if (isFormOpen) {
    //close it
    newBookForm.style.display = "none";
    isFormOpen = false;
    newBookForm.reset();
  } else {
    //open it
    newBookForm.style.display = "block";
    isFormOpen = true;
  }
}

function addDummyBooks() {
  let book1 = new Book(
    "Harry Potter and the Philospher's Stone",
    "J. K. Rowling",
    false
  );
  let book2 = new Book(
    "Percy Jackson: The Lightning Thief",
    "Rick Riordan",
    false
  );
  let book3 = new Book("Komi-san wa Komyushou Desu", "Tomohito Oda", true);
  let book4 = new Book("Rich Dad Poor Dad", "Robert Kiyosaki", true);
  let book5 = new Book("Overlord", "Kugane Maruyama", false);

  myLibrary.set(book1.bookId, book1);
  myLibrary.set(book2.bookId, book2);
  myLibrary.set(book3.bookId, book3);
  myLibrary.set(book4.bookId, book4);
  myLibrary.set(book5.bookId, book5);
}

function deleteAllBooks() {
  var e = document.querySelector(".list-books-container");
  //e.firstElementChild can be used.
  var child = e.lastElementChild;
  while (child) {
    console.log("deleting current books");
    e.removeChild(child);
    child = e.lastElementChild;
  }
  myLibrary = new Map();
}

function createBook(e) {
  //prevents page to reload when submitting the form for new book
  e.preventDefault();
  let newBook = new Book(
    bookName.value,
    bookAuthor.value,
    bookReadStatus.checked
  );

  //close book
  toggleForm();
  addBookToLibrary(newBook);
}

function addBookToLibrary(book) {
  if (myLibrary.set(book.id, book)) {
    addBookElement(book);
  }
}

function getAllBooks() {
  const books = [];
  for (let [key, value] of myLibrary) {
    books.push(value);
  }

  return books;
}

function addBookElement(book) {
  let newBookElement = document.createElement("div");
  newBookElement.classList.add("book");

  let bookId = document.createElement("div");
  bookId.classList.add("book-index");
  bookId.innerText = book.bookId;

  let newBookName = document.createElement("div");
  newBookName.classList.add("book-title");
  newBookName.innerText = book.bookName;

  let newBookAuthor = document.createElement("div");
  newBookAuthor.classList.add("book-author");
  newBookAuthor.innerText = book.bookAuthor;

  let newBookReadStatus = document.createElement("div");
  newBookReadStatus.classList.add("book-read-status");
  if (book.hasRead) {
    newBookReadStatus.classList.add("read");
    newBookReadStatus.innerText = "Read";
  } else {
    newBookReadStatus.innerText = "Not Read";
  }

  let removeButton = document.createElement("div");
  removeButton.classList.add("remove-button");
  removeButton.innerText = "Remove";
  newBookReadStatus.addEventListener("click", function () {
    let currentBook = book;

    if (currentBook.hasRead) {
      currentBook.hasRead = false;
      newBookReadStatus.innerText = "Not Read";
    } else {
      newBookReadStatus.innerText = "Read";
      currentBook.hasRead = true;
    }
    PubSub.publish("book_read_updated", {
      cloudID: book.cloudID,
      hasRead: book.hasRead,
    });
    newBookReadStatus.classList.toggle("read");
  });

  removeButton.addEventListener("click", function () {
    console.log("DELETED!");
    newBookElement.remove();
    myLibrary.delete(parseInt(bookId.innerText));
    if (book.cloudID) {
      PubSub.publish("book_removed", book.cloudID);
    }
  });
  newBookElement.appendChild(newBookName);
  newBookElement.appendChild(newBookAuthor);
  newBookElement.appendChild(newBookReadStatus);
  newBookElement.appendChild(removeButton);
  bookContainer.appendChild(newBookElement);
}

newBookForm.onsubmit = createBook;
addBookButton.addEventListener("click", toggleForm);

export { addDummyBooks, deleteAllBooks, addBookToLibrary, getAllBooks };
