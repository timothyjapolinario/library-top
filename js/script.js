let myLibrary = [];
let bookContainer = document.querySelector(".list-books-container")
let addBookButton = document.querySelector(".button-add-book");


function Book(bookName, bookDescription, hasRead) {
    this.bookName = bookName;
    this.bookDescription = bookDescription;
    this.hasRead = hasRead;
}

function createBook(){
    newBook = new Book("Book1", "Book1Description", false);
    addBookToLibrary(newBook)
}

function addBookToLibrary(book) {
    if(myLibrary.push(book)){
        addBookElementUI(book)
    }
}

function addBookElementUI(book){
    const para = document.createElement("p")
    para.innerText = book.bookName;
    bookContainer.appendChild(para);
}

addBookButton.addEventListener('click', createBook);
