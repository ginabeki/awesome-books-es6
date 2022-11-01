// eslint-disable-next-line import/no-cycle
import Book from './modules/book.js';
// eslint-disable-next-line import/no-cycle
import populateAddBookSection from './modules/add_book.js';
import populateContactSection from './modules/contact.js';
import BookList from './modules/local_storage.js';
import { DateTime } from './modules/luxon.js';

/* eslint-disable max-classes-per-file */
const currentDateTime = document.querySelector('.date-time');
// ==== Luxon Date ====
const updateTime = () => {
  const now = DateTime.now();
  currentDateTime.innerHTML = now.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
};
setInterval(updateTime, 1000);

const main = document.getElementById('main');
const bookListSection = document.createElement('section');
const booksList = document.createElement('div');
bookListSection.id = 'list';
bookListSection.innerHTML = '<h1>Awesome books</h1>';

const bookList = new BookList();

const populateMainSection = () => {
  booksList.className = 'books-container';
  main.appendChild(bookListSection);
  main.appendChild(populateAddBookSection());
  main.appendChild(populateContactSection());
};

window.addEventListener('DOMContentLoaded', () => {
  populateMainSection();
  bookList.checkBooks();
  const book = new Book();
  book.displayBooks();
});

const linkItems = document.querySelectorAll('.nav-item');
linkItems.forEach((item) => {
  item.addEventListener('click', () => {
    const activeLink = document.getElementById(item.id);
    const activeSection = document.getElementById(item.id.substring(5));

    if (!activeLink.classList.contains('active')) {
      activeLink.classList.add('active');
      activeSection.classList.remove('d-off');
    }

    linkItems.forEach((previousItem) => {
      const hiddenSection = document.getElementById(previousItem.id.substring(5));
      if (previousItem.id !== item.id && previousItem.classList.contains('active')) {
        previousItem.classList.remove('active');
      }
      if (previousItem.id !== item.id && !hiddenSection.classList.contains('d-off')) {
        hiddenSection.classList.add('d-off');
      }
    });
  });
});
export { bookList, booksList, bookListSection };