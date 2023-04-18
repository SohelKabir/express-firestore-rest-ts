## Bookstore API

This is a CRUD API for managing books using Express.js, TypeScript, and Firebase Firestore.

### Getting Started

1. clone this repository

   ```
   git clone git@github.com:SohelKabir/express-firestore-rest-ts.git
   ```

2. Install the dependencies:

   ```
   cd express-firestore-rest-ts 
   npm install
   ```

3. Set up your Firebase project:

    Create a new Firebase project at <https://console.firebase.google.com/>
    In the Firebase console, go to Project Settings > Service Accounts and click "Generate new private key" to download a JSON key file for your Firebase project.
    Rename the JSON key file to serviceAccountKey.json and save it in the root of the project directory.

4. Set up the environment variables:

   Create a .env file in the root of the project directory and add the following environment variables:

   ```
   PORT=3000
   NODE_ENV=dev
   ```

5. Start the server:

      ```
      npm start 
      ```

## API Endpoints

#### ``` GET /books ```

Retrieves a list of all books.

#### ```GET /books/:id```

Retrieves a single book by ID.

#### ```POST /books```

Creates a new book.

example request json  body:

```
{
    "title":"Dune",
    "author":"Frank Herbert,",
    "year": 1965
}
```

#### ```PUT /books/:id```

Updates an existing book by ID.

example request json  body:

```
{
    "title":"I Am Legend",
    "author":"Richard Matheson",
    "year": 1954
}
```

#### ```DELETE /books/:id```

Deletes a book by ID.

### Demo App deployed in Render

``` https://express-firebase.onrender.com ```

to test the endpoint make a request  

#### ``` GET /books ```

```https://express-firebase.onrender.com/books```

Retrieves a list of all books.
