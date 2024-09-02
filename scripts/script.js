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
const addBooksToList = (...book) => {
  const uList = document.querySelector('.book-list');

  for (let i = 0; i < book.length; i += 1) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    span.textContent = JSON.stringify(book[i]);
    li.setAttribute('id', `${book[i].id}`);
    li.appendChild(span);
    uList.appendChild(li);
    applyRemoveButtonToNode(span);
    applyReadButtonToNode(span);
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

const handlePublishNewBookButton = () => {
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

// Remove item from Library
const removeItem = (id, ...arrayObj) => {
  for (let i = 0; i < arrayObj.length; i += 1) {
    for (const prop in arrayObj[i]) {
      if (id === arrayObj[i][prop].id) {
        arrayObj[i].splice(+prop[i], 1);        
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
  addBooksToList(book);
  addBooksToLibrary(book);
  handleRemoveButton();
};

const handleRemoveButton = () => {
  const removeButtons = document.querySelectorAll('.btn.remove');

  for (let i = 0; i < removeButtons.length; i += 1) {
    removeButtons[i].addEventListener('click', () => {
      removeItem(removeButtons[i].parentNode.getAttribute('id'), myLibrary);
      removeButtons[i].parentNode.remove();
    });
  }

};

const handleSubmitButton = (event) => {
  const submitButton = document.querySelector('.submit');
  const inputs = document.querySelectorAll('form input');

  submitButton.addEventListener('click', createBookFromForm);
  submitButton.addEventListener('click', () => {
    for (let i = 0; i < inputs.length; i += 1) {
      inputs[i].value = '';
    }
  })
};

const handleReadButton = () => {
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
const applyRemoveButtonToNode = (node) => {
  const button = document.createElement('button');

  button.textContent = 'Remove';
  button.setAttribute('class', 'btn remove');
  node.insertAdjacentElement('afterend', button);
  handleRemoveButton();
};

// Attach each book with a remove button
const applyReadButtonToNode = (node) => {
  const button = document.createElement('button');

  button.textContent = 'Read';
  button.setAttribute('class', 'btn read');
  node.insertAdjacentElement('afterend', button);
};

// Handle buttons
handleSubmitButton();
// Apply event listener to NEW BOOK button
const newBookBtn = document.querySelector('#new-book');
newBookBtn.addEventListener('click', handlePublishNewBookButton);
// Apply event listener to Submit button
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', handleSubmitButton);