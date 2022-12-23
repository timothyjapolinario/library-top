/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Book.js":
/*!*****************************!*\
  !*** ./src/modules/Book.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let newId = 0;
function Book(bookName, bookAuthor, hasRead) {
  this.bookId = newId;
  this.bookName = bookName;
  this.bookAuthor = bookAuthor;
  this.hasRead = hasRead;
  newId += 1;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Book);


/***/ }),

/***/ "./src/modules/Library.js":
/*!********************************!*\
  !*** ./src/modules/Library.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addDummyBooks": () => (/* binding */ addDummyBooks),
/* harmony export */   "loadBookUI": () => (/* binding */ loadBookUI)
/* harmony export */ });
/* harmony import */ var _Book__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Book */ "./src/modules/Book.js");


let myLibrary = new Map();
let bookContainer = document.querySelector(".list-books-container");
let addBookButton = document.querySelector(".button-add-book");
let isFormOpen = false;
let newBookForm = document.querySelector(".form-add-book-popup > form");
let submitNewBookButton = document.querySelector("#submit-new-book-button");

let bookName = document.querySelector("#new-book-name");
let bookAuthor = document.querySelector("#new-book-author");
let bookReadStatus = document.querySelector("#new-book-read-status");
addDummyBooks();
loadBookUI();
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
  let book1 = new _Book__WEBPACK_IMPORTED_MODULE_0__["default"](
    "Harry Potter and the Philospher's Stone",
    "J. K. Rowling",
    false
  );
  let book2 = new _Book__WEBPACK_IMPORTED_MODULE_0__["default"](
    "Percy Jackson: The Lightning Thief",
    "Rick Riordan",
    false
  );
  let book3 = new _Book__WEBPACK_IMPORTED_MODULE_0__["default"]("Komi-san wa Komyushou Desu", "Tomohito Oda", true);
  let book4 = new _Book__WEBPACK_IMPORTED_MODULE_0__["default"]("Rich Dad Poor Dad", "Robert Kiyosaki", true);
  let book5 = new _Book__WEBPACK_IMPORTED_MODULE_0__["default"]("Overlord", "Kugane Maruyama", false);

  myLibrary.set(book1.bookId, book1);
  myLibrary.set(book2.bookId, book2);
  myLibrary.set(book3.bookId, book3);
  myLibrary.set(book4.bookId, book4);
  myLibrary.set(book5.bookId, book5);
}

function loadBookUI() {
  for (let [key, value] of myLibrary) {
    addBookElement(value);
  }
}

function createBook(e) {
  //prevents page to reload when submitting the form for new book
  e.preventDefault();
  let newBook = new _Book__WEBPACK_IMPORTED_MODULE_0__["default"](
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

function addBookElement(book) {
  let newBookElement = document.createElement("div");
  newBookElement.classList.add("book");

  let bookId = document.createElement("div");
  bookId.classList.add("book-inex");
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
    let currentBook = myLibrary.get(parseInt(bookId.innerText));
    if (currentBook.hasRead) {
      currentBook.hasRead = false;
      newBookReadStatus.innerText = "Not Read";
    } else {
      newBookReadStatus.innerText = "Read";
      currentBook.hasRead = true;
    }
    newBookReadStatus.classList.toggle("read");
    console.log(currentBook);
  });

  removeButton.addEventListener("click", function () {
    console.log("DELETED!");
    newBookElement.remove();
    myLibrary.delete(parseInt(bookId.innerText));
  });
  newBookElement.appendChild(newBookName);
  newBookElement.appendChild(newBookAuthor);
  newBookElement.appendChild(newBookReadStatus);
  newBookElement.appendChild(removeButton);
  bookContainer.appendChild(newBookElement);
}

newBookForm.onsubmit = createBook;
addBookButton.addEventListener("click", toggleForm);




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Library */ "./src/modules/Library.js");


(0,_modules_Library__WEBPACK_IMPORTED_MODULE_0__.loadBookUI)();
(0,_modules_Library__WEBPACK_IMPORTED_MODULE_0__.addDummyBooks)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RNOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLDZDQUFJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFJO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFJO0FBQ3RCLGtCQUFrQiw2Q0FBSTtBQUN0QixrQkFBa0IsNkNBQUk7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2Q0FBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRXFDOzs7Ozs7O1VDcElyQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhEOztBQUU5RCw0REFBVTtBQUNWLCtEQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGlicmFyeS10b3AvLi9zcmMvbW9kdWxlcy9Cb29rLmpzIiwid2VicGFjazovL2xpYnJhcnktdG9wLy4vc3JjL21vZHVsZXMvTGlicmFyeS5qcyIsIndlYnBhY2s6Ly9saWJyYXJ5LXRvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saWJyYXJ5LXRvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGlicmFyeS10b3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWJyYXJ5LXRvcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpYnJhcnktdG9wLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBuZXdJZCA9IDA7XG5mdW5jdGlvbiBCb29rKGJvb2tOYW1lLCBib29rQXV0aG9yLCBoYXNSZWFkKSB7XG4gIHRoaXMuYm9va0lkID0gbmV3SWQ7XG4gIHRoaXMuYm9va05hbWUgPSBib29rTmFtZTtcbiAgdGhpcy5ib29rQXV0aG9yID0gYm9va0F1dGhvcjtcbiAgdGhpcy5oYXNSZWFkID0gaGFzUmVhZDtcbiAgbmV3SWQgKz0gMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQm9vaztcbiIsImltcG9ydCBCb29rIGZyb20gXCIuL0Jvb2tcIjtcblxubGV0IG15TGlicmFyeSA9IG5ldyBNYXAoKTtcbmxldCBib29rQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0LWJvb2tzLWNvbnRhaW5lclwiKTtcbmxldCBhZGRCb29rQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXR0b24tYWRkLWJvb2tcIik7XG5sZXQgaXNGb3JtT3BlbiA9IGZhbHNlO1xubGV0IG5ld0Jvb2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWFkZC1ib29rLXBvcHVwID4gZm9ybVwiKTtcbmxldCBzdWJtaXROZXdCb29rQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXQtbmV3LWJvb2stYnV0dG9uXCIpO1xuXG5sZXQgYm9va05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1ib29rLW5hbWVcIik7XG5sZXQgYm9va0F1dGhvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LWJvb2stYXV0aG9yXCIpO1xubGV0IGJvb2tSZWFkU3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctYm9vay1yZWFkLXN0YXR1c1wiKTtcbmFkZER1bW15Qm9va3MoKTtcbmxvYWRCb29rVUkoKTtcbmZ1bmN0aW9uIHRvZ2dsZUZvcm0oKSB7XG4gIGlmIChpc0Zvcm1PcGVuKSB7XG4gICAgLy9jbG9zZSBpdFxuICAgIG5ld0Jvb2tGb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBpc0Zvcm1PcGVuID0gZmFsc2U7XG4gICAgbmV3Qm9va0Zvcm0ucmVzZXQoKTtcbiAgfSBlbHNlIHtcbiAgICAvL29wZW4gaXRcbiAgICBuZXdCb29rRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGlzRm9ybU9wZW4gPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZER1bW15Qm9va3MoKSB7XG4gIGxldCBib29rMSA9IG5ldyBCb29rKFxuICAgIFwiSGFycnkgUG90dGVyIGFuZCB0aGUgUGhpbG9zcGhlcidzIFN0b25lXCIsXG4gICAgXCJKLiBLLiBSb3dsaW5nXCIsXG4gICAgZmFsc2VcbiAgKTtcbiAgbGV0IGJvb2syID0gbmV3IEJvb2soXG4gICAgXCJQZXJjeSBKYWNrc29uOiBUaGUgTGlnaHRuaW5nIFRoaWVmXCIsXG4gICAgXCJSaWNrIFJpb3JkYW5cIixcbiAgICBmYWxzZVxuICApO1xuICBsZXQgYm9vazMgPSBuZXcgQm9vayhcIktvbWktc2FuIHdhIEtvbXl1c2hvdSBEZXN1XCIsIFwiVG9tb2hpdG8gT2RhXCIsIHRydWUpO1xuICBsZXQgYm9vazQgPSBuZXcgQm9vayhcIlJpY2ggRGFkIFBvb3IgRGFkXCIsIFwiUm9iZXJ0IEtpeW9zYWtpXCIsIHRydWUpO1xuICBsZXQgYm9vazUgPSBuZXcgQm9vayhcIk92ZXJsb3JkXCIsIFwiS3VnYW5lIE1hcnV5YW1hXCIsIGZhbHNlKTtcblxuICBteUxpYnJhcnkuc2V0KGJvb2sxLmJvb2tJZCwgYm9vazEpO1xuICBteUxpYnJhcnkuc2V0KGJvb2syLmJvb2tJZCwgYm9vazIpO1xuICBteUxpYnJhcnkuc2V0KGJvb2szLmJvb2tJZCwgYm9vazMpO1xuICBteUxpYnJhcnkuc2V0KGJvb2s0LmJvb2tJZCwgYm9vazQpO1xuICBteUxpYnJhcnkuc2V0KGJvb2s1LmJvb2tJZCwgYm9vazUpO1xufVxuXG5mdW5jdGlvbiBsb2FkQm9va1VJKCkge1xuICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgbXlMaWJyYXJ5KSB7XG4gICAgYWRkQm9va0VsZW1lbnQodmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvb2soZSkge1xuICAvL3ByZXZlbnRzIHBhZ2UgdG8gcmVsb2FkIHdoZW4gc3VibWl0dGluZyB0aGUgZm9ybSBmb3IgbmV3IGJvb2tcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsZXQgbmV3Qm9vayA9IG5ldyBCb29rKFxuICAgIGJvb2tOYW1lLnZhbHVlLFxuICAgIGJvb2tBdXRob3IudmFsdWUsXG4gICAgYm9va1JlYWRTdGF0dXMuY2hlY2tlZFxuICApO1xuXG4gIC8vY2xvc2UgYm9va1xuICB0b2dnbGVGb3JtKCk7XG4gIGFkZEJvb2tUb0xpYnJhcnkobmV3Qm9vayk7XG59XG5cbmZ1bmN0aW9uIGFkZEJvb2tUb0xpYnJhcnkoYm9vaykge1xuICBpZiAobXlMaWJyYXJ5LnNldChib29rLmlkLCBib29rKSkge1xuICAgIGFkZEJvb2tFbGVtZW50KGJvb2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEJvb2tFbGVtZW50KGJvb2spIHtcbiAgbGV0IG5ld0Jvb2tFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3Qm9va0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJvb2tcIik7XG5cbiAgbGV0IGJvb2tJZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJvb2tJZC5jbGFzc0xpc3QuYWRkKFwiYm9vay1pbmV4XCIpO1xuICBib29rSWQuaW5uZXJUZXh0ID0gYm9vay5ib29rSWQ7XG5cbiAgbGV0IG5ld0Jvb2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3Qm9va05hbWUuY2xhc3NMaXN0LmFkZChcImJvb2stdGl0bGVcIik7XG4gIG5ld0Jvb2tOYW1lLmlubmVyVGV4dCA9IGJvb2suYm9va05hbWU7XG5cbiAgbGV0IG5ld0Jvb2tBdXRob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBuZXdCb29rQXV0aG9yLmNsYXNzTGlzdC5hZGQoXCJib29rLWF1dGhvclwiKTtcbiAgbmV3Qm9va0F1dGhvci5pbm5lclRleHQgPSBib29rLmJvb2tBdXRob3I7XG5cbiAgbGV0IG5ld0Jvb2tSZWFkU3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbmV3Qm9va1JlYWRTdGF0dXMuY2xhc3NMaXN0LmFkZChcImJvb2stcmVhZC1zdGF0dXNcIik7XG4gIGlmIChib29rLmhhc1JlYWQpIHtcbiAgICBuZXdCb29rUmVhZFN0YXR1cy5jbGFzc0xpc3QuYWRkKFwicmVhZFwiKTtcbiAgICBuZXdCb29rUmVhZFN0YXR1cy5pbm5lclRleHQgPSBcIlJlYWRcIjtcbiAgfSBlbHNlIHtcbiAgICBuZXdCb29rUmVhZFN0YXR1cy5pbm5lclRleHQgPSBcIk5vdCBSZWFkXCI7XG4gIH1cblxuICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcmVtb3ZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZW1vdmUtYnV0dG9uXCIpO1xuICByZW1vdmVCdXR0b24uaW5uZXJUZXh0ID0gXCJSZW1vdmVcIjtcblxuICBuZXdCb29rUmVhZFN0YXR1cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGxldCBjdXJyZW50Qm9vayA9IG15TGlicmFyeS5nZXQocGFyc2VJbnQoYm9va0lkLmlubmVyVGV4dCkpO1xuICAgIGlmIChjdXJyZW50Qm9vay5oYXNSZWFkKSB7XG4gICAgICBjdXJyZW50Qm9vay5oYXNSZWFkID0gZmFsc2U7XG4gICAgICBuZXdCb29rUmVhZFN0YXR1cy5pbm5lclRleHQgPSBcIk5vdCBSZWFkXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0Jvb2tSZWFkU3RhdHVzLmlubmVyVGV4dCA9IFwiUmVhZFwiO1xuICAgICAgY3VycmVudEJvb2suaGFzUmVhZCA9IHRydWU7XG4gICAgfVxuICAgIG5ld0Jvb2tSZWFkU3RhdHVzLmNsYXNzTGlzdC50b2dnbGUoXCJyZWFkXCIpO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRCb29rKTtcbiAgfSk7XG5cbiAgcmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coXCJERUxFVEVEIVwiKTtcbiAgICBuZXdCb29rRWxlbWVudC5yZW1vdmUoKTtcbiAgICBteUxpYnJhcnkuZGVsZXRlKHBhcnNlSW50KGJvb2tJZC5pbm5lclRleHQpKTtcbiAgfSk7XG4gIG5ld0Jvb2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld0Jvb2tOYW1lKTtcbiAgbmV3Qm9va0VsZW1lbnQuYXBwZW5kQ2hpbGQobmV3Qm9va0F1dGhvcik7XG4gIG5ld0Jvb2tFbGVtZW50LmFwcGVuZENoaWxkKG5ld0Jvb2tSZWFkU3RhdHVzKTtcbiAgbmV3Qm9va0VsZW1lbnQuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcbiAgYm9va0NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdCb29rRWxlbWVudCk7XG59XG5cbm5ld0Jvb2tGb3JtLm9uc3VibWl0ID0gY3JlYXRlQm9vaztcbmFkZEJvb2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZUZvcm0pO1xuXG5leHBvcnQgeyBhZGREdW1teUJvb2tzLCBsb2FkQm9va1VJIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGxvYWRCb29rVUksIGFkZER1bW15Qm9va3MgfSBmcm9tIFwiLi9tb2R1bGVzL0xpYnJhcnlcIjtcblxubG9hZEJvb2tVSSgpO1xuYWRkRHVtbXlCb29rcygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9