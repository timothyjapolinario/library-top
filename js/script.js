let myLibrary = [];
let bookContainer = document.querySelector(".list-books-container")
let addBookButton = document.querySelector(".button-add-book");
let bookDescriptionDummy = "Book Description Lorem ipsum,animi maxime obcaecati perferendis impedit laboriosa    m repudiandae quas ipsum quia officiis, repellat quidem! A"
let isFormOpen = false;
let newBookForm = document.querySelector(".form-add-book-popup");
console.log(newBookForm);

function toggleForm(){
    if(isFormOpen){
        //close it
        newBookForm.style.display = "none";
        isFormOpen = false;
        newBookForm.querySelector("form").reset()
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

function createBook(){
    toggleForm();
}


function addBookToLibrary(book) {
    if(myLibrary.push(book)){
        addBookElementUI(book)
    }
}


function addBookElementUI(book){
    console.log("lol")
    let newBook = document.createElement("div")
    newBook.classList.add("book")

    let newBookName = document.createElement("div");
    newBookName.classList.add("book-title");
    newBookName.innerText = book.bookName;

    let newBookDescription = document.createElement("div");
    newBookDescription.classList.add("book-description");
    newBookDescription.innerText = book.bookDescription;

    let newBookReadStatus = document.createElement("div")
    newBookReadStatus.classList.add("book-read-status")
    newBookReadStatus.innerText = "Read Status: "

    newBook.appendChild(newBookName);
    newBook.appendChild(newBookDescription);
    newBook.appendChild(newBookReadStatus);
    bookContainer.appendChild(newBook);
}

addBookButton.addEventListener('click', createBook);
