import {
  addDummyBooks,
  addBookToLibrary,
  getAllBooks,
  deleteAllBooks,
} from "./modules/Library";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
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
let allBookIDs;
let userEmail;
console.log(db);
init();
function signin() {
  const auth = getAuth();
  console.log("Signing In!");
  var provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

async function saveUserToCloud(userEmail, books) {
  const dbRef = doc(db, "users", userEmail);
  console.log("Saving user to cloud");
  try {
    //User has data already in the database, only needs to update
    await updateDoc(dbRef, {
      books: arrayUnion(...books),
    });
  } catch (error) {
    //User has no data in the database, need to add.
    await setDoc(dbRef, {
      email: userEmail,
      books: books,
    });
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

document.querySelector("#upload-book").addEventListener("click", () => {
  console.log("signing out");
  signOut(getAuth());
});

async function updateHeader() {
  if (getAuth().currentUser !== null) {
    const user = getAuth().currentUser;
    console.log("UPDATING HEADER!");

    const signInButton = document.querySelector("#sign-in-button");
    signInButton.classList.add("inactive");

    //creating new element with user info
    const userInfoUI = document.createElement("div");
    userInfoUI.id = "user-info";
    const userName = document.createElement("div");
    userName.innerText = user.displayName;
    userInfoUI.appendChild(userName);
    document.querySelector(".header").appendChild(userInfoUI);
  } else {
    console.log(document.querySelector("#user-info"));
    document.querySelector("#user-info").remove();
    const signInButton = document.querySelector("#sign-in-button");
    signInButton.classList.remove("inactive");
  }
}
async function getAllCloudBooks(bookIdList) {
  for (const book of bookIdList) {
    const bookRef = doc(db, "books", `${book.cloudID}`);
    const q = await getDoc(bookRef);
    addBookToLibrary(q.data());
  }
}
async function getUserBookIds(userEmail) {
  const userRef = doc(db, "users", userEmail);
  const q = await getDoc(userRef);
  return q.data().books;
}
async function removeBook(msg, data) {
  console.log(msg, data);
  console.log(userEmail);
  const dbRef = doc(db, "users", userEmail);
  //await deleteDoc(doc(db, "books", `${data}`));
  allBookIDs = allBookIDs.filter((book) => book.cloudID !== `${data}`);
  console.log(allBookIDs);
  try {
    await updateDoc(dbRef, {
      books: allBookIDs,
    }).then(() => {
      console.log("Removed Success!");
    });
  } catch (error) {
    console.log("Error deleting book", error);
  }
}
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
  PubSub.subscribe("book_removed", removeBook);
  //updates current user even in cold start
  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      updateHeader();
      userEmail = user.email;
      //upload unsaved local books
      const localBooks = getAllBooks();
      const updatedBooks = await uploadUnsavedLocalBooks(localBooks);
      await saveUserToCloud(user.email, updatedBooks);
      allBookIDs = await getUserBookIds(user.email);
      await getAllCloudBooks(allBookIDs);
    } else {
      console.log("No user");
      updateHeader();
      deleteAllBooks();
    }
  });
}
