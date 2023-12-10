const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://booksproject-osq6031bw-bisma-aslams-projects.vercel.app/api/books';

async function displayBooks() {
    try {
        console.log('Fetching books...');
        const response = await fetch(corsProxyUrl + apiUrl);
        // ... rest of the code
    } catch (error) {
        console.error(error);
    }
}

async function addBook() {
    try {
        console.log('Adding book...');
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        const response = await fetch(corsProxyUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, author }),
        });

        // ... rest of the code
    } catch (error) {
        console.error(error);
    }
}

// ... rest of the code


async function addBook() {
    try {
        console.log('Adding book...');
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        const response = await fetch('https://booksproject-osq6031bw-bisma-aslams-projects.vercel.app/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
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
        const response = await fetch(`https://booksproject-osq6031bw-bisma-aslams-projects.vercel.app/api/books/${bookId}`, {
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

function editBook(id, title, author) {
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;

    const addButton = document.querySelector('#addBookForm button');
    addButton.textContent = 'Update Book';
    addButton.onclick = async () => {
        try {
            console.log('Updating book...');
            const response = await fetch(`https://booksproject-osq6031bw-bisma-aslams-projects.vercel.app/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: document.getElementById('title').value, author: document.getElementById('author').value })
            });

            console.log('Update Book Response:', response);

            if (!response.ok) {
                throw new Error(`Failed to update book: ${response.statusText}`);
            }

            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
            addButton.textContent = 'Add Book';
            addButton.onclick = addBook;

            displayBooks();
        } catch (error) {
            console.error(error);
        }
    };
}

// Initial display of books
displayBooks();
