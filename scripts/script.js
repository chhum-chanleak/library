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
    const btnSpan = document.createElement('span');
    
    for (const prop in book[i]) {
      const span = document.createElement('span');
      const nestedList = document.createElement('li');

      span.textContent = `${prop}: ${book[i][prop]}`;
      span.setAttribute('class', `span ${prop}`);
      nestedList.appendChild(span);
      li.setAttribute('id', `${book[i].id}`);
      li.appendChild(nestedList);
      uList.appendChild(li);
    }
    btnSpan.textContent = ' ';
    li.appendChild(btnSpan); 
    applyRemoveButtonToNode(btnSpan);
    applyReadButtonToNode(btnSpan);       
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

// Clear all books from list
const clearBookList = () => {
  const lists = document.querySelectorAll('li');

  for (let i = 0; i < lists.length; i += 1) {
    lists[i].remove();
  }
};

const handleRemoveButton = () => {
  const removeButtons = document.querySelectorAll('.btn.remove');
  const removeMessage = document.querySelector('.remove-message');
  const bookId = document.querySelector('#book-id');
  const yes = document.querySelector('#yes');

  for (let i = 0; i < removeButtons.length; i += 1) {
    removeButtons[i].addEventListener('click', () => {

      removeMessage.style.display= 'flex';
      bookId.textContent = `${removeButtons[i].parentNode.getAttribute('id')}?`;
      bookId.style.color = '#6c61ef';
      yes.setAttribute('class', `${removeButtons[i].parentNode.getAttribute('id')}`);
    });
  }
};

const handleYes = () => {
  const removeMessage = document.querySelector('.remove-message');
  const yes = document.querySelector('#yes');

  removeMessage.setAttribute('id', 'Yes');
  removeMessage.style.display = 'none';
  removeItem(`${yes.getAttribute('class')}`, myLibrary);
  console.log(`${yes.getAttribute('class')} has been removed.`);
  clearBookList();
  addBooksToList(...myLibrary);
  handleRemoveButton();
};

const handleNo = () => {
  const removeMessage = document.querySelector('.remove-message');

  removeMessage.setAttribute('id', 'No');
  removeMessage.style.display = 'none';
};

const yes = document.querySelector('#yes');
const no = document.querySelector('#no');

no.addEventListener('click', handleNo);
yes.addEventListener('click', handleYes);

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

// Attach each book with a remove button
const applyRemoveButtonToNode = (node) => {
  const button = document.createElement('button');

  button.textContent = 'Remove';
  button.setAttribute('class', 'btn remove');
  node.insertAdjacentElement('afterend', button);
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