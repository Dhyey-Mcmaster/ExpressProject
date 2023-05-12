const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

public_users.get("/user",(req,res) =>{
    res.send(users);
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let myPromise = new Promise((resolve,reject) => setTimeout(() => {
    resolve("Promise 1 resolved")
  },6000));

  myPromise.then((successMessage) => {
    res.send(JSON.stringify(books,null,4));  
})
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let myPromise = new Promise((resolve,reject) => setTimeout(() => {
        resolve("Promise 1 resolved")
      },3000));
    
      myPromise.then((successMessage) => {

        res.send(books[isbn])
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const auth = req.params.author;
  
  let myPromise = new Promise((resolve,reject) => setTimeout(() => {
    resolve("Promise 1 resolved")
  },3000));

  myPromise.then((successMessage) => {
    let findBook = Object.values(books).filter((book) =>{
        return book.author === auth
      })
    res.send(findBook)
})

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const tit = req.params.title;

  let myPromise = new Promise((resolve,reject) => setTimeout(() => {
    resolve("Promise 1 resolved")
  },3000));

  myPromise.then((successMessage) => {
    let findBook = Object.values(books).filter((book) =>{
        return book.title === tit
      })
    
    res.send(findBook)
})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;

res.send(books[isbn])
});

module.exports.general = public_users;
