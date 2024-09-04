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

    li.setAttribute('class', 'book-list-item');
    
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
    setColorForProps();       
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
  
  if (validateSubmitButton() === false) {
    return;
  }

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
  handleReadButton();
};

// Clear all books from list
const clearBookList = () => {
  const lists = document.querySelectorAll('li');

  for (let i = 0; i < lists.length; i += 1) {
    lists[i].remove();
  }
};

// Set color to all object property tags
const setColorForProps = () =>  {
  const propSpans = document.querySelectorAll('li.book-list-item span');

  for (let i = 0; i < propSpans.length; i += 1) {
    switch(propSpans[i].getAttribute('class')) {
      case 'span title': propSpans[i].parentNode.style.backgroundColor = '#8B0000';
        break;
      case 'span author': propSpans[i].parentNode.style.backgroundColor = '#FF8C00';
        break;
      case 'span genre': propSpans[i].parentNode.style.backgroundColor = '#9B870C88';
        break;
      case 'span pages': propSpans[i].parentNode.style.backgroundColor = '#006400';
        break;
      case 'span readStatus': propSpans[i].parentNode.style.backgroundColor = '#00008B';
        break;
      case 'span id': propSpans[i].parentNode.style.backgroundColor = '#4B0082';
        break;
    }
  }
};

// Get object by inputting id
const getObject = (id) => {
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (id === myLibrary[i].id) {
      return myLibrary[i];
    }
  }
};

// Remove an object from an array of objects by passing an id
const removeObj = (id) => {
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (id === myLibrary[i].id) {
      myLibrary.splice(i, 1);
    }
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

const handleReadButton = () => {
  const readButtons = document.querySelectorAll('.btn.read');

  for (let i = 0; i < readButtons.length; i += 1) {

    readButtons[i].addEventListener('click', () => {
      
      toggleReadStatus(getObject(readButtons[i].parentNode.getAttribute('id')));
      clearBookList();
      addBooksToList(...myLibrary);
      handleRemoveButton();
      handleReadButton();
    });    
  }
};

const handleSubmitButton = () => {
  const submitButton = document.querySelector('.submit');
  const inputs = document.querySelectorAll('form input');

  submitButton.addEventListener('click', createBookFromForm);
  submitButton.addEventListener('click', () => {
    for (let i = 0; i < inputs.length; i += 1) {

      if (inputs[i].value !== '') {
        return;
      } else {
        inputs[i].value = '';
      }      
    }
  })
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

  button.textContent = 'Mark As Read';
  button.setAttribute('class', `btn read`);
  node.insertAdjacentElement('afterend', button);
  button.setAttribute('id', `read-${button.parentNode.getAttribute('id')}`);
};

// Return false when one of the input fields is empty
const validateSubmitButton = () => {
  const inputs = document.querySelectorAll('form input');
  const submitMessage = document.querySelector('.submit-message');
  let count = 0;

  for (let i = 0; i < inputs.length; i += 1) {
    if (inputs[i].value === '') {
      submitMessage.style.display = 'inline-block';
      return false;
    } else {
      submitMessage.style.display = 'none';

    }   
  }
};

const clearInputFields = () => {
  const inputs = document.querySelectorAll('form input');

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = '';
  }
};

// Show form when DOM finished loading
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const publishNewBookButton = document.querySelector('button#new-book');

  form.style.display = 'block';
  publishNewBookButton.textContent = 'HIDE FORM';
});

// Handle buttons
handleSubmitButton();
// Apply event listener to NEW BOOK button
const newBookBtn = document.querySelector('#new-book');
newBookBtn.addEventListener('click', handlePublishNewBookButton);
// Apply event listener to Submit button
const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', handleSubmitButton);