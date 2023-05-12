const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

var users = [];

const isValid = (username)=>{ //returns boolean

    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }

}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn:60 * 60});

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn]
  if (book) { //Check is friend exists
      let reviews = req.query.reviews;
      let author = req.query.author;
      let title = req.query.title;
      
      console.log(book)
      console.log(reviews)
    if(reviews) {
        console.log(reviews)
        book["reviews"] = reviews
    }
    if(author) {
        book["author"] = author
    }
    if(title) {
        book["title"] = title
    }
      books[isbn]=book;
      res.send(`Book with isbn ${isbn} updated. ${books[isbn]}`);
      //res.send(book)
  }
  else{
      res.send("Unable to find Book!");
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    let book = books[isbn]

    if (book){
        delete Object.values(books).filter((req.params.reviews))
    }
    res.send(`Friend with the email  ${email} deleted.`);

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
