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

    //Add the ability to remove self from the library
    const removeFromLibrary = document.createElement("button");
    removeFromLibrary.textContent = "Remove book from library?"
    removeFromLibrary.addEventListener("click", () => {
        const index = myLibrary.findIndex(bookFromLib => bookFromLib.id === book.id);
        if(index > -1) {
            myLibrary.splice(index, 1);
        }
        booksDiv.removeChild(bookCardDiv);
    });

    //Add to HTML tree
    bookCardDiv.appendChild(bookInfo);
    bookCardDiv.appendChild(removeFromLibrary);
    bookCardDiv.appendChild(toggleRead);

    booksDiv.appendChild(bookCardDiv);
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
);

const Minecraft = new Book(
    "Mine",
    "Steve",
    49482,
    false
);

const dialog = document.getElementById("new-book-dialog");
document.getElementById("new-book-btn").addEventListener("click", () => { dialog.showModal(); });
document.getElementById("close-dialog").addEventListener("click", () => dialog.close());

const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(newBookForm);
    let add = true;
    ["title", "author", "pages"].forEach(property => {
        if (formData.get(property) === "") {
            alert(`Enter the ${property}`);
            add = false;
        };
    });
    if (add) {
        new Book(
            formData.get("title"),
            formData.get("author"),
            formData.get("pages"),
            false
        );
        newBookForm.reset();
        dialog.close();
    }
});