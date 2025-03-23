
// array that stores the books
const myLibrary = [];

// constructor for books
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID()
    this.title = title; 
    this.author = author; 
    this.pages = pages; 
    this.isRead = isRead; 
}


function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
    const newBook = new Book(title, author, pages, isRead)
    myLibrary.push(newBook)
}

function removeBookFromLibrary(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

function displayBooks() {
    const libraryContainer = document.getElementById('library')
    libraryContainer.innerHTML = ''; 

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div'); 
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-book-id', book.id);

        bookCard.innerHTML = `
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">by ${book.author}</div>
                    <div class="book-pages">${book.pages} pages</div>
                    <div class="book-status">
                        ${book.isRead ? 'Read' : 'Not Read'}
                    </div>
                    <button class="remove-btn" data-book-id="${book.id}">Remove</button>
                `;

                libraryContainer.appendChild(bookCard);
    })

    // Add event listeners to all remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.getAttribute('data-book-id');
            removeBookFromLibrary(bookId);
            displayBooks(); // Refresh the display
        });
    });
}

// Modal and Form Handling
const newBookBtn = document.querySelector('.new-book-btn');
const modal = document.getElementById('newBookModal');
const form = document.getElementById('newBookForm');
const cancelBtn = document.getElementById('cancelBtn');

newBookBtn.addEventListener('click', () => {
    modal.showModal(); // Opens the dialog
});

cancelBtn.addEventListener('click', () => {
    modal.close(); // Closes the dialog
    form.reset(); // Clears the form
});

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents default form submission

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = Number(document.getElementById('pages').value); // Convert to number
    const isRead = document.getElementById('isRead').value === 'true'; // Convert to boolean

    addBookToLibrary(title, author, pages, isRead);
    displayBooks(); // Update the display
    modal.close(); // Close the modal
    form.reset(); // Reset the form for next use
});

displayBooks()


