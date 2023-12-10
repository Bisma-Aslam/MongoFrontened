const apiUrl = "https://booksproject.vercel.app/api/books";

async function displayBooks() {
    try {
        console.log('Fetching books...');
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch books: ${response.statusText}`);
        }

        const books = await response.json();
        console.log('Fetched books:', books);

        const table = document.getElementById('booksTable');
        // Clear existing rows
        table.innerHTML = '<tr><th>Title</th><th>Author</th><th>Action</th></tr>';

        // Populate the table with book data
        // Populate the table with book data
books.forEach(book => {
    console.log('Book:', book);

    const row = table.insertRow();

    // Log the entire book object
    console.log('Book Object:', book);

    // Extract title and author with fallback to 'N/A'
    const title = book.title || book.name || book.someOtherProperty || 'N/A';
    const author = book.author || book.creator || book.someAuthorProperty || 'N/A';

    row.insertCell(0).textContent = title;
    row.insertCell(1).textContent = author;

    // Add Edit and Delete buttons
    const actionsCell = row.insertCell(2);
    actionsCell.innerHTML = `<button onclick="editBook('${book._id}', '${title}', '${author}')">Edit</button> 
    <button onclick="deleteBook('${book._id}')">Delete</button>`;
});

    } catch (error) {
        console.error(error);
    }
}

// Rest of your code remains unchanged


async function addBook() {
    try {
        console.log('Adding book...');
        const title = document.getElementById('title').value.trim();  // Trim to remove leading/trailing spaces
        const author = document.getElementById('author').value.trim();

        if (!title || !author) {
            console.error('Title and Author are required.');
            return;
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author }),
        });

        console.log('Add Book Response:', response);

        if (!response.ok) {
            throw new Error(`Failed to add book: ${response.statusText}`);
        }

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        displayBooks();
    } catch (error) {
        console.error(error);
    }
}


async function deleteBook(bookId) {
    try {
        console.log('Deleting book...');
        const response = await fetch(`${apiUrl}/${bookId}`, {
            method: 'DELETE'
        });

        console.log('Delete Book Response:', response);

        if (!response.ok) {
            throw new Error(`Failed to delete book: ${response.statusText}`);
        }

        displayBooks();
    } catch (error) {
        console.error(error);
    }
}

function resetAddButton() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const addButton = document.querySelector('#addBookForm button');

    titleInput.value = '';
    authorInput.value = '';
    addButton.textContent = 'Add Book';
    addButton.onclick = addBook;
}

function editBook(id, title, author) {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    // Set input values directly
    titleInput.value = title || '';
    authorInput.value = author || '';

    const addButton = document.querySelector('#addBookForm button');
    addButton.textContent = 'Update Book';
    addButton.onclick = async () => {
        try {
            console.log('Updating book...');
            const updatedTitle = titleInput.value.trim();
            const updatedAuthor = authorInput.value.trim();

            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: updatedTitle, author: updatedAuthor })
            });

            console.log('Update Book Response:', response);

            if (!response.ok) {
                throw new Error(`Failed to update book: ${response.statusText}`);
            }

            resetAddButton();

            displayBooks();
        } catch (error) {
            console.error(error);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial display of books
    displayBooks();
});
