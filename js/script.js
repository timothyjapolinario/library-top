let myLibrary = [];
let bookContainer = document.querySelector(".list-books-container")
let addBookButton = document.querySelector(".button-add-book");
let isFormOpen = false;
let newBookForm = document.querySelector(".form-add-book-popup > form");
let submitNewBookButton = document.querySelector("#submit-new-book-button");

function toggleForm(){
    if(isFormOpen){
        //close it
        newBookForm.style.display = "none";
        isFormOpen = false;
        newBookForm.reset()
    }else{
        //open it
        newBookForm.style.display = "block";
        isFormOpen = true;
        
    }
}



function Book(bookName, bookDescription, hasRead) {
    this.bookName = bookName;
    this.bookDescription = bookDescription;
    this.hasRead = hasRead;
}

let bookName = document.querySelector("#new-book-name");
let bookDescription = document.querySelector("#new-book-description");
let bookReadStatus = document.querySelector("#new-book-read-status");

function createBook(e){
    //prevents page to reload when submitting the form for new book
    e.preventDefault()
    let newBook = new Book(bookName.value, bookDescription.value, bookReadStatus.checked)
    toggleForm()
    addBookToLibrary(newBook);
}




function addBookToLibrary(book) {
    if(myLibrary.push(book)){
        addBookElement(book)
    }
}


function addBookElement(book){
    let newBookElement = document.createElement("div")
    newBookElement.classList.add("book")

    let newBookName = document.createElement("div");
    newBookName.classList.add("book-title");
    newBookName.innerText = book.bookName;

    let newBookDescription = document.createElement("div");
    newBookDescription.classList.add("book-description");
    newBookDescription.innerText = book.bookDescription;

    let newBookReadStatus = document.createElement("div")
    newBookReadStatus.classList.add("book-read-status")
    if(book.hasRead){
        newBookReadStatus.classList.add("read")
    }else{
        newBookReadStatus.classList.add("unread")
    }
    newBookReadStatus.innerText = "Read Status: "

    newBookElement.appendChild(newBookName);
    newBookElement.appendChild(newBookDescription);
    newBookElement.appendChild(newBookReadStatus);
    bookContainer.appendChild(newBookElement);
}

newBookForm.onsubmit = createBook;
addBookButton.addEventListener('click', toggleForm);
