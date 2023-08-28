const express = require("express");
const jwt = require("jsonwebtoken");
const regd_users = require("./auth_users.js").authenticated;
const app = express();

app.get("/public_users", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3000/public_users");
    const titlesWithNumbers = response.data.map(
      ([number, book]) => `${number}: ${book.title}`
    );
    res.json(titlesWithNumbers);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ error: "An error occurred while fetching books" });
  }
});

app.get("/public_users/isbn/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(
      `http://localhost:3000/public_users/isbn/${isbn}`
    );
    const book = response.data;

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error.message);
    res.status(500).json({ error: "An error occurred while fetching book" });
  }
});

app.get("/public_users/author/:author", async (req, res) => {
  const author = req.params.author;

  try {
    const response = await axios.get(
      `http://localhost:3000/public_users/author/${author}`
    );
    const authorBooks = response.data;

    if (authorBooks.length > 0) {
      res.json(authorBooks);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (error) {
    console.error("Error fetching author's books:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching author's books" });
  }
});

app.get("/title/:title", (req, res) => {
  const requestedTitle = req.params.title;

  axios
    .get(`http://localhost:3000/public_users`)
    .then((response) => {
      const allBooks = response.data;
      const matchingBooks = allBooks.filter(
        (book) => book.title === requestedTitle
      );

      if (matchingBooks.length === 0) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(matchingBooks);
      }
    })
    .catch((error) => {
      console.error("Error fetching books:", error.message);
      res.status(500).json({ error: "An error occurred while fetching books" });
    });
});
// // Your existing isValid and authenticatedUser functions remain the same

// // Your authentication middleware
// function auth(req, res, next) {
//   // Implementation remains the same
// }

// // Only registered users can login
// regd_users.post("/login", (req, res) => {
//   // Your login logic here
//   // For testing purposes, you can send a sample response
//   res.status(200).json({ message: "Login successful" });
// });

// // // Add a book review
// // regd_users.put("/auth/review/:isbn", auth, (req, res) => {
// //   // Your review logic here
// //   // For testing purposes, you can send a sample response
// //   res.status(200).json({ message: "Review added successfully" });
// // });

// // Public user routes
// const public_users = express.Router();

// public_users.post("/register", (req, res) => {
//   // For testing purposes, you can send a sample response
//   res.status(200).json({ message: "User registered successfully" });
// });

// // Implement other route handlers similarly

// // // Use the router in the app
// // app.use("/public_users", public_users);

// // Start the server on port 3000
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
