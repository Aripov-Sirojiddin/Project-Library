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
    createBookCard(this);
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
    false
)

const Minecraft = new Book(
    "Mine",
    "Steve",
    49482,
    false
)

function createBookCard(book) {
    //Create the book card in the html tree.
    const booksDiv = document.getElementById("books-container");

    const bookCardDiv = document.createElement("div");
    bookCardDiv.className = "book";

    const bookInfo = document.createElement("p");
    bookInfo.id = `p-${book.id}`;
    bookInfo.textContent = book.info();

    //Add the ability to change the have read status on the dom.
    const toggleRead = document.createElement("button");
    toggleRead.id = `btn-${book.id}`;
    toggleRead.textContent = "Mark finished?";

    toggleRead.addEventListener("click", () => {
        book.haveRead = !book.haveRead;
        toggleRead.innerHTML = book.haveRead ? "Mark unfinished?" : "Mark finished?";
        bookInfo.textContent = book.info();
    });

    bookCardDiv.appendChild(bookInfo);
    bookCardDiv.appendChild(toggleRead);

    booksDiv.appendChild(bookCardDiv);
}
