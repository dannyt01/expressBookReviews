const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("../booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Returns boolean
  // Write code to check if the username is valid
  // For example:
  return users.includes(username);
};

const authenticatedUser = (username, password) => {
  // Returns boolean
  // Write code to check if username and password match the one we have in records
  // For example:
  return username === "validUsername" && password === "validPassword";
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(username) && authenticatedUser(username, password)) {
    // Generate an access token
    const accessToken = jwt.sign({ username }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;

  // Write your logic here to add the book review
  // You can update the 'books' array or any other database you are using

  res.status(200).json({ message: "Review added successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
