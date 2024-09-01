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

// Display all books in the library to list
const addBooksToList = (library) => {
  const uList = document.querySelector('.book-list');

  for (let i = 0; i < library.length; i += 1) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    span.textContent = JSON.stringify(library[i]);
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
  const publishNewBookButton = document.querySelector('#new-book');

  if (form.style.display === '') {
    publishNewBookButton.textContent = 'HIDE FORM';
    form.style.display = 'block';
  } else {
    publishNewBookButton.textContent = 'PUBLISH NEW BOOK';
    form.style.display = '';
  }
};

const handleRemoveButton = () => {
  const removeButtons = document.querySelectorAll('.btn.remove');
  const readButtons = document.querySelectorAll('.btn.read');
  const lists = document.querySelectorAll('.library li');
  
  // Apply event listener
  for (let i = 0; i < removeButtons.length; i += 1) {
    removeButtons[i].addEventListener('click', () => {
      lists[i].remove();
      readButtons[i].remove();
      removeButtons[i].remove();
      console.log(`${readButtons[i].id} has been removed.`);
      removeItem(readButtons[i].id, myLibrary);
    })   
  }
};

// Remove item from Library
const removeItem = (id, ...object) => {
  for (let i = 0; i < object.length; i += 1) {
    for (const prop in object[i]) {
      if (id === object[i][prop].id) {
        object[i].splice(+prop[i], 1);        
      }
    }
  }
};

const handleSubmitButton = () => {
  const submitButton = document.querySelector('.submit');

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
  })
};


const handleRead = () => {
  const readButtons = document.querySelectorAll('.book-list .btn.read');
  const spans = document.querySelectorAll('.book-list span');

  for (let i = 0; i < readButtons.length; i += 1) {
    readButtons[i].addEventListener('click', () => {
      if (readButtons[i].style.backgroundColor === '') {
        readButtons[i].style.backgroundColor = '#037a1c';
        readButtons[i].style.color = '#fff';

        for (let j = 0; j < myLibrary.length; j += 1) {
          if (readButtons[i].getAttribute('id') === myLibrary[j].id) {
            toggleReadStatus(myLibrary[j]);
            spans[j].textContent = JSON.stringify(myLibrary[j]);
          }
        }
      } else {
        readButtons[i].style.backgroundColor = '';
        readButtons[i].style.color = '#000';
        for (let j = 0; j < myLibrary.length; j += 1) {
          if (readButtons[i].getAttribute('id') === myLibrary[j].id) {
            toggleReadStatus(myLibrary[j]);
            spans[j].textContent = JSON.stringify(myLibrary[j]);
          }
        }
      }      
    })
  }
};

// Apply event listener to NEW BOOK button
const newBookBtn = document.querySelector('#new-book');
newBookBtn.addEventListener('click', handleNewBook);

// Attach each book with a remove button
const applyRemoveButton = () => {
  const lists = document.querySelectorAll('li');
  
  for (let i = 0; i < lists.length; i += 1) {
    const button = document.createElement('button');

    button.textContent = 'Remove';
    button.setAttribute('id', myLibrary[i].id);
    button.setAttribute('class', 'btn remove');
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
    button.setAttribute('class', 'btn read');
    lists[i].insertAdjacentElement('afterend', button);  
  }
};

const book1 = new Book('book1', 'English For Children', 'Unknown', 'Educational', 100, 'Not yet');
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
const book4 = new Book('book4', 'Differential Equations', 'G. Leibniz', 'Educational', 400, 'Not yet');
addBooksToLibrary(book2, book3, book1, book4);

addBooksToList(myLibrary);

// Attach each book with Remove and Read buttons
applyRemoveButton();
applyReadButton();
// Handle buttons
handleRead();
handleSubmitButton();
handleRemoveButton();