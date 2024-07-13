import axios from "axios"

export const addOneBook = (book)=> async dispatch =>{
    dispatch({
        type:'ADD_BOOK_REQUEST'
    })
  
    try {
        const response = await axios.post('http://localhost:5000/api/books/addBook',book);
         
        dispatch({
           type:'ADD_BOOK_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'ADD_BOOK_FAILED',
           payload:error
       })
    }
}

//to get list of all available books
export const getAllBook = ()=> async dispatch =>{
    dispatch({
        type:'GET_BOOKS_REQUEST'
    })
    try {
        const response = await axios.get('http://localhost:5000/api/books/allBook');
        console.log(response.data)
        dispatch({
           type:'GET_BOOKS_SUCCESS',
           payload:response.data
       })
    } catch (error) {
       dispatch({
           type:'GET_BOOKS_FAILED',
           payload:error
       })
    }
}

export const bookDeletedByAdmin = (postId)=> async dispatch =>{
    console.log(postId);
    try {
       await axios.post('http://localhost:5000/api/books/bookDelete' , {postId})
       
        const response = await axios.get('http://localhost:5000/api/books/allBook');
        dispatch({
           type:'GET_All_BOOKS_SUCCESS',
           payload:response.data
       })
      } 
      catch (error) {
        console.log(error);
      }
  
}

//to filter the books to be displayed based on the serach term
export const filterBook = (searchKey = "", author = "", genre = "", department = "", publisher = "") => async dispatch => {
    dispatch({
        type: 'GET_BOOKS_REQUEST'
    });

    try {
        console.log(searchKey)
        console.log(author)
        console.log(genre)
        console.log(department)
        console.log(publisher)

        const response = await axios.get('http://localhost:5000/api/books/allBook');
        let filteredBooks = response.data;

        if (searchKey) {
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchKey.toLowerCase()));
        }
        if (author) {
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase() === author.toLowerCase());
        }
        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
        }
        if (department) {
            filteredBooks = filteredBooks.filter(book => book.department.toLowerCase() === department.toLowerCase());
        }
        if (publisher) {
            filteredBooks = filteredBooks.filter(book => book.publisher.toLowerCase() === publisher.toLowerCase());
        }

        dispatch({
            type: 'GET_BOOKS_SUCCESS',
            payload: filteredBooks
        });
    } catch (error) {
        dispatch({
            type: 'GET_BOOKS_FAILED',
            payload: error
        });
    }
};

export const filterValues = () => async dispatch => {
    dispatch({
        type: 'GET_FILTER_VALUES'
    });
    try {
        const response = await axios.get('http://localhost:5000/api/books/allBook');
        const books = response.data || [];
        
        const authors = Array.from(new Set(books.map(book => book.author)));
        const genres = Array.from(new Set(books.map(book => book.genre)));
        const departments = Array.from(new Set(books.map(book => book.department)));
        const publishers = Array.from(new Set(books.map(book => book.publisher)));
        
        dispatch({
            type: 'GET_FILTER_VALUES_SUCCESS',
            payload: { authors, genres, departments, publishers }
        });
    } catch (error) {
        dispatch({
            type: 'GET_FILTER_VALUES_FAILED',
            payload: error.message
        });
    }
};

export const recomBook = (authors = [], genres = [], departments = []) => async dispatch => {
    console.log("called");
    dispatch({
        type: 'GET_RECOMENDED_BOOKS_REQUEST'
    });

    try {
        const response = await axios.get('http://localhost:5000/api/books/allBook');
        let filteredBooks = response.data;
        console.log(filteredBooks);
        if (authors.length > 0) {
            filteredBooks = filteredBooks.filter(book =>
                authors.some(author => book.author.toLowerCase() === author.toLowerCase())
            );
        }

        if (genres.length > 0) {
            filteredBooks = filteredBooks.filter(book =>
                genres.some(genre => book.genre.toLowerCase() === genre.toLowerCase())
            );
        }

        if (departments.length > 0) {
            filteredBooks = filteredBooks.filter(book =>
                departments.some(department => book.department.toLowerCase() === department.toLowerCase())
            );
        }

        console.log(filteredBooks);
        dispatch({
            type: 'GET_RECOMENDED_BOOKS_SUCCESS',
            payload: filteredBooks
        });
    } catch (error) {
        dispatch({
            type: 'GET_RECOMENDED_BOOKS_FAILED',
            payload: error
        });
    }
};
