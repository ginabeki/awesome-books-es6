// eslint-disable-next-line import/no-cycle
import Book from './book.js';

const populateAddBookSection = () => {
  const addBookSection = document.createElement('section');
  const addBookSectionTitle = document.createElement('h2');
  const form = document.createElement('form');
  addBookSection.id = 'add';
  addBookSection.classList.add('add-book', 'd-flex', 'col', 'd-off');
  addBookSectionTitle.textContent = 'Add a new book';
  addBookSectionTitle.className = 'section-title';
  form.id = 'create-form';
  form.innerHTML = `<input name="title" type="text" placeholder="title" id="title" required>
      <input name="author" type="text" placeholder="author" id="author" required>
      <button type="submit" id="form-button" >Add</button>
      <div id="success-msg"></div>`;

  addBookSection.appendChild(addBookSectionTitle);
  addBookSection.appendChild(form);

  function saveFormData(book) {
    localStorage.setItem('formData', JSON.stringify(book));
  }

  function displaySuccess() {
    const successMsg = document.getElementById('success-msg');
    successMsg.textContent = 'Your book has been added!';
    setTimeout(() => {
      successMsg.textContent = '';
    }, 3000);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title, author } = form.elements;
    const newBook = new Book(title.value, author.value);
    newBook.addBook();
    saveFormData({ title: title.value, author: author.value });
    displaySuccess();
  });

  function checkFormData() {
    const { title, author } = form.elements;
    if (localStorage.getItem('formData')) {
      title.value = JSON.parse(localStorage.getItem('formData')).title;
      author.value = JSON.parse(localStorage.getItem('formData')).author;
    }
  }

  checkFormData();

  return addBookSection;
};
export default populateAddBookSection;