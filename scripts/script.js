const myLibrary = [];

// Book constructor
function Book(title, author, genre, pages) {
  this.title = title;
  this.author = author;
  this.genre = genre;
}

const addBookToLibrary = (book) => {
  myLibrary.push(book);
};

const addBooksToList = (...books) => {
  const uList = document.querySelector('.book-list');

  for (let i = 0; i < books.length; i += 1) {
    const li = document.createElement('li');

    li.textContent = JSON.stringify(books[i]);
    uList.appendChild(li);
  }
};

const displayLibrary = () => {
  console.log(myLibrary);
};

const handleNewBook = () => {
  const form = document.querySelector('form');

  form.style.display = 'block';
};

// Apply event listener to NEW BOOK button
const newBookBtn = document.querySelector('#new-book');
newBookBtn.addEventListener('click', handleNewBook);

// Attach each book with a remove button
const applyRemoveButton = () => {
  const lists = document.querySelectorAll('li');
  console.log(lists);

  for (let i = 0; i < lists.length; i += 1) {
    const button = document.createElement('button');

    button.textContent = 'Remove';
    lists[i].appendChild(button);
  }
};

// Attach each book with a remove button
const applyReadButton = () => {
  const lists = document.querySelectorAll('li');
  console.log(lists);

  for (let i = 0; i < lists.length; i += 1) {
    const button = document.createElement('button');

    button.textContent = 'Read';
    lists[i].appendChild(button);
  }
};

const arr = [1, 3, 8, 5, 6, 7, 2];

const book1 = new Book('English For Children', 'Unknown', 'Educational', 100);
addBookToLibrary(book1);
const book2 = {
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational',
  pages: 200
};
const book3 = {
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational'
};
addBookToLibrary(book2);

addBooksToList(book1, book2);
addBooksToList(book3);

// Attach each book with Remove and Read buttons
applyRemoveButton();
applyReadButton();