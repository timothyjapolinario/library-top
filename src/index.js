import {
  loadBookUI,
  addDummyBooks,
  addBookToLibrary,
  getAllBooks,
} from "./modules/Library";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCsLScmnZfyHeYtCtgk-fKCE21pWLrBb2w",
  authDomain: "library-48e14.firebaseapp.com",
  projectId: "library-48e14",
  storageBucket: "library-48e14.appspot.com",
  messagingSenderId: "465546520570",
  appId: "1:465546520570:web:9103b86e36db5effe7a643",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
init();
function signin() {
  const auth = getAuth();
  console.log("Signing In!");
  var provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    updateHeader(result.user);
  });
}

async function saveUserToCloud(userEmail, books) {
  const dbRef = collection(db, "users");
  console.log("Saving user to cloud");
  try {
    await setDoc(doc(dbRef), {
      userEmail: userEmail,
      books: books,
    });
  } catch (error) {
    console.log("Error saving user to cloud", error);
  }
}

async function uploadBook(book) {
  const dbRef = collection(db, "books");
  const bookDoc = doc(dbRef);
  try {
    await setDoc(bookDoc, { ...book, cloudID: bookDoc.id });
    return bookDoc.id;
  } catch (error) {
    console.log("Error adding book to FireStore", error);
  }
  return bookDoc.id;
}

document.querySelector("#upload-book").addEventListener("click", uploadBook);

async function updateHeader() {
  if (getAuth().currentUser !== null) {
    const user = getAuth().currentUser;
    console.log("UPDATING HEADER!");

    const signInButton = document.querySelector("#sign-in-button");
    signInButton.classList.add("inactive");

    //creating new element with user info
    const userInfoUI = document.createElement("div");
    const userName = document.createElement("div");
    userName.innerText = user.displayName;
    userInfoUI.appendChild(userName);
    document.querySelector(".header").appendChild(userInfoUI);
  }
}
async function getAllCloudBooks(bookIdList) {}

async function uploadUnsavedLocalBooks(localBooks) {
  const updateBooks = [];
  for (const book of localBooks) {
    if (book.cloudID === null) {
      const uploadedBookID = await uploadBook(book).then((id) => {
        return id;
      });
      updateBooks.push({ cloudID: uploadedBookID });
    }
  }

  return updateBooks;
}
async function init() {
  const signInButton = document.querySelector("#sign-in-button");
  signInButton.addEventListener("click", async () => {
    signin();
  });

  //updates current user even in cold start
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      updateHeader();

      //upload unsaved local books
      const localBooks = getAllBooks();
      const updatedBooks = await uploadUnsavedLocalBooks(localBooks);
      saveUserToCloud(user.email, updatedBooks);
    } else {
      console.log("No user");
    }
  });

  addDummyBooks();
  loadBookUI();
}
