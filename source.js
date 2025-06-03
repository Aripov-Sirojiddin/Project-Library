const crypto = require("crypto")

const myLibrary = [];

function Book(title, author, pages, haveRead) {
    if (!new.target) {
        console.log("You forgot the \"new\" keyword when instantiating dummy!");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    myLibrary.push(this);
}
//Info is not unique for each object this we define it in here to save memory
Book.prototype.info = function () {
    return `${this.title} by ${this.author} has ${this.pages} pages.`
        + `\nYou ${this.haveRead ? "have read this book." : "haven't finished this book yet."} `;
}

const harry = new Book(
    "Harry",
    "John",
    492,
    false
);

const JohnSon = new Book(
    "Joe",
    "Bitten",
    139,
    true
)
