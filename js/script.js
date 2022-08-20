bookContainer = document.querySelector(".list-books-container")
addBookButton = document.querySelector(".button-add-book");
newBookForm = document.querySelector(".form-add-book-popup > form");
submitNewBookButton = document.querySelector("#submit-new-book-button");

bookName = document.querySelector("#new-book-name");
bookAuthor = document.querySelector("#new-book-author");
bookReadStatus = document.querySelector("#new-book-read-status");


class Library{
    myLibrary = new Map();
    newId = 0;
    
    isFormOpen = false;
    constructor(){}


    toggleForm =() =>{
        if(this.isFormOpen){
            //close it
            newBookForm.style.display = "none";
            this.isFormOpen = false;
            newBookForm.reset()
        }else{
            //open it
            newBookForm.style.display = "block";
            this.isFormOpen = true;
            
        }
    }

    loadBookUI(){
        for(let [key, value] of this.myLibrary){
            console.log(value)
            this.addBookElement(value);
        }
    
    }

    addDummyBooks(){
        let book1 = new Book("Harry Potter and the Philospher's Stone", "J. K. Rowling", false, this.newId)
        this.newId += 1;
        let book2 = new Book("Percy Jackson: The Lightning Thief", "Rick Riordan", false,this.newId)
        this.newId += 1;
        let book3 = new Book("Komi-san wa Komyushou Desu", "Tomohito Oda", true,this.newId)
        this.newId += 1;
        let book4 = new Book("Rich Dad Poor Dad", "Robert Kiyosaki", true,this.newId)
        this.newId += 1;
        let book5 = new Book("Overlord", "Kugane Maruyama", false,this.newId)
        this.newId += 1;
    
        this.myLibrary.set(book1.bookId,book1);
        this.myLibrary.set(book2.bookId, book2);
        this.myLibrary.set(book3.bookId, book3);
        this.myLibrary.set(book4.bookId, book4);
        this.myLibrary.set(book5.bookId, book5);
        console.log(this.myLibrary)
    }

    createBook= (e) =>{
        //prevents page to reload when submitting the form for new book
        e.preventDefault()
        let newBook = new Book(bookName.value, bookAuthor.value, bookReadStatus.checked, this.newId)
        
        //close book    
        this.toggleForm()
        this.addBookToLibrary(newBook);
    }
    
    
    addBookToLibrary=(book)=>{
        if(this.myLibrary.set(book.id, book)){
            this.addBookElement(book)
        }
    }

    addBookElement=(book)=>{
        let newBookElement = document.createElement("div")
        newBookElement.classList.add("book")
    
        let bookId = document.createElement("div")
        bookId.classList.add("book-inex");
        bookId.innerText = book.bookId;
    
        let newBookName = document.createElement("div");
        newBookName.classList.add("book-title");
        newBookName.innerText = book.bookName;
    
        let newBookAuthor = document.createElement("div");
        newBookAuthor.classList.add("book-author");
        newBookAuthor.innerText =  book.bookAuthor;
    
        let newBookReadStatus = document.createElement("div")
        newBookReadStatus.classList.add("book-read-status")
        if(book.hasRead){
            newBookReadStatus.classList.add("read")
            newBookReadStatus.innerText = "Read"
        }else{
            newBookReadStatus.innerText = "Not Read"
        }
        
        let removeButton = document.createElement("div")
        removeButton.classList.add("remove-button")
        removeButton.innerText = "Remove"
    
        newBookReadStatus.addEventListener('click', function(){
            let currentBook = this.myLibrary.get(parseInt(bookId.innerText));
            if(currentBook.hasRead){
                currentBook.hasRead = false;
                newBookReadStatus.innerText = "Not Read";
                
            }else{
                newBookReadStatus.innerText = "Read"
                currentBook.hasRead = true;
            }
            newBookReadStatus.classList.toggle("read");
            console.log(currentBook);
        })

    
        removeButton.addEventListener('click', ()=>{
            newBookElement.remove();
            this.myLibrary.delete(parseInt(bookId.innerText));
            console.log(this.myLibrary)
        })
        newBookElement.appendChild(newBookName);
        newBookElement.appendChild(newBookAuthor);
        newBookElement.appendChild(newBookReadStatus);
        newBookElement.appendChild(removeButton);
        bookContainer.appendChild(newBookElement);
    }


}



function Book(bookName, bookAuthor, hasRead, id) {
    this.bookId = id;
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.hasRead = hasRead;
}

const mainLibrary = new Library()


newBookForm.onsubmit = mainLibrary.createBook;
addBookButton.addEventListener('click', mainLibrary.toggleForm);
mainLibrary.addDummyBooks();
mainLibrary.loadBookUI();
console.log(mainLibrary)









