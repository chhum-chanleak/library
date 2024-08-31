const myLibrary = [];

// Book constructor
function Book(title, author, genre) {
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

const arr = [1, 3, 8, 5, 6, 7, 2];

const book1 = new Book('English For Children', 'Unknown', 'Educational');
addBookToLibrary(book1);
const book2 = {
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational'
};
const book3 = {
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational'
};
addBookToLibrary(book2);

addBooksToList(book1, book2);
addBooksToList(book3);