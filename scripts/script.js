const myLibrary = [];

// Book constructor
function Book(id, title, author, genre, pages, readStatus) {
  this.id = id,
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.readStatus = readStatus;
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


const handleRead = () => {
  const readButtons = document.querySelectorAll('#read');
  // console.log(getParentNode(readButton));

  for (let i = 0; i < readButtons.length; i += 1) {
    readButtons[i].addEventListener('click', () => {
      if (readButtons[i].style.backgroundColor === '') {
        readButtons[i].style.backgroundColor = '#00FF00';
      } else {
        readButtons[i].style.backgroundColor = '';
      }      
    })
  }
};

// Apply event listener to NEW BOOK button
const newBookBtn = document.querySelector('#new-book');
newBookBtn.addEventListener('click', handleNewBook);

// Apply event listeners to Read buttons
// const applyEventListeners = () => {
//   const buttons = document.querySelectorAll('#read');
//   console.log(buttons);
//   for (let i = 0; i < buttons.length; i += 1) {
//     buttons[i].addEventListener('click', handleRead);
//   }
// };

// Attach each book with a remove button
const applyRemoveButton = () => {
  const lists = document.querySelectorAll('li');
  
  for (let i = 0; i < lists.length; i += 1) {
    const button = document.createElement('button');

    button.textContent = 'Remove';
    lists[i].appendChild(button);
  }
};

// Attach each book with a remove button
const applyReadButton = () => {
  const lists = document.querySelectorAll('li');

  for (let i = 0; i < lists.length; i += 1) {
    const button = document.createElement('button');

    button.textContent = 'Read';
    button.setAttribute('id', 'read');
    lists[i].appendChild(button);
  }
};


const book1 = new Book(1, 'English For Children', 'Unknown', 'Educational', 100, 'Not yet');
addBookToLibrary(book1);
const book2 = {
  id: 2,
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational',
  pages: 200,
  readStatus: 'Not yet'
};
const book3 = {
  id: 3,
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational',
  pages: 300,
  readStatus: 'Not yet'
};
addBookToLibrary(book2);

addBooksToList(book1, book2);
addBooksToList(book3);

// Attach each book with Remove and Read buttons
applyRemoveButton();
applyReadButton();
// Handle Read buttons
handleRead();