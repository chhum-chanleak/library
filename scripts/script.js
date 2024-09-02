const myLibrary = [];

// Book constructor
function Book(title, author, genre, pages, readStatus = 'Not yet', id = `book${automaticallyIncreasedId()}`) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = id;
}

// Get automatically increased id
const IncreasingId = () => {
  let count = 0;

  return () => {
    return count += 1;
  }
};
const automaticallyIncreasedId = IncreasingId();

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

// Gather all form data
const createBookFromForm = (event) => {
  event.preventDefault();

  const inputs = document.querySelectorAll('form input');
  const formData = [];
  let book;

  for (let i = 0; i < inputs.length; i += 1) {
    formData.push(inputs[i].value);
  }
  
  book = new Book(...formData);
  addBooksToLibrary(book);
  addBooksToList(myLibrary);
};


const handleSubmitButton = () => {
  const submitButton = document.querySelector('.submit');
  const inputs = document.querySelectorAll('form input');

  submitButton.addEventListener('click', createBookFromForm);
  submitButton.addEventListener('click', () => {
    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
    }
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

addBooksToList(myLibrary);

// Attach each book with Remove and Read buttons
applyRemoveButton();
applyReadButton();
// Handle buttons
handleRead();
handleSubmitButton();
handleRemoveButton();
// Apply event listener to NEW BOOK button
const newBookBtn = document.querySelector('#new-book');
newBookBtn.addEventListener('click', handleNewBook);
// Apply event listener to Submit button
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', handleSubmitButton);