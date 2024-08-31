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

const addBooksToLibrary = (...book) => {
  for (let i = 0; i < book.length; i += 1) {
    myLibrary.push(book[i]);
  }
};

const addBooksToList = (...books) => {
  const uList = document.querySelector('.book-list');

  for (let i = 0; i < books.length; i += 1) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    span.textContent = JSON.stringify(books[i]);
    li.appendChild(span);
    uList.appendChild(li);
  }
};

const displayLibrary = () => {
  console.log(myLibrary);
};

const toggleReadStatus = (obj) => {
  if (obj.readStatus === 'Not yet') {
    obj.readStatus = 'Already read';
  } else {
    obj.readStatus = 'Not yet';
  }  
};

const handleNewBook = () => {
  const form = document.querySelector('form');

  form.style.display = 'block';
};

const handleSubmitButton = () => {
  const submitButton = document.querySelector('.submit');

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
  })
};


const handleRead = () => {
  const readButtons = document.querySelectorAll('.book-list button');
  const spans = document.querySelectorAll('.book-list span');

  for (let i = 0; i < readButtons.length; i += 1) {
    readButtons[i].addEventListener('click', () => {
      if (readButtons[i].style.backgroundColor === '') {
        readButtons[i].style.backgroundColor = '#00FF00';

        for (let j = 0; j < myLibrary.length; j += 1) {
          if (readButtons[i].getAttribute('id') === myLibrary[j].id) {
            toggleReadStatus(myLibrary[j]);
            spans[j].textContent =  JSON.stringify(myLibrary[j]);
          }
        }
      } else {
        readButtons[i].style.backgroundColor = '';
        for (let j = 0; j < myLibrary.length; j += 1) {
          if (readButtons[i].getAttribute('id') === myLibrary[j].id) {
            toggleReadStatus(myLibrary[j]);
            spans[j].textContent =  JSON.stringify(myLibrary[j]);
          }
        }
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
    lists[i].insertAdjacentElement('afterend', button); 
  }
};

// Attach each book with a remove button
const applyReadButton = () => {
  const lists = document.querySelectorAll('li');

  for (let i = 0; i < lists.length; i += 1) {
    const button = document.createElement('button');

    button.textContent = 'Read';
    button.setAttribute('id', myLibrary[i].id);
    lists[i].insertAdjacentElement('afterend', button);  
  }
};


const book1 = new Book('book1', 'English For Children', 'Unknown', 'Educational', 100, 'Not yet');
addBooksToLibrary(book1);
const book2 = {
  id: 'book2',
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational',
  pages: 200,
  readStatus: 'Not yet'
};
const book3 = {
  id: 'book3',
  title:'Programming',
  author: 'Unknown',
  genre: 'Educational',
  pages: 300,
  readStatus: 'Not yet'
};
addBooksToLibrary(book2, book3);

addBooksToList(book1, book2);
addBooksToList(book3);

// Attach each book with Remove and Read buttons
applyRemoveButton();
applyReadButton();
// Handle buttons
handleRead();
handleSubmitButton();