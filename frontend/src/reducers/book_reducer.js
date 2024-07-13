export const addBookReducer = (state={bookItems:[]},action)=>{
    switch(action.type){
        case 'ADD_BOOK_REQUEST':
            return {...state , loading:true}    
        case 'ADD_BOOK_SUCCESS':
            return {...state,
                bookItems:[...state.bookItems ,action.payload ],
                loading:false
            }      
        default:
            return state         
    }
}

export const getAllBookReducer = (state={books:[]},action)=>{
    console.log(action.payload)
    switch(action.type){
        case 'GET_BOOKS_REQUEST':
            return {...state,loading:true}
        case 'GET_BOOKS_SUCCESS':
            return {
                books:action.payload,loading:false
            }    
        case 'GET_BOOKS_FAILED':
            return {error:action.payload,loading:false}
        default:
            return state         
    }
}

export const getRecomBookReducer = (state={books:[]},action)=>{
  console.log(action.payload)
  switch(action.type){
      case 'GET_RECOMENDED_BOOKS_REQUEST':
          return {...state,loading:true}
      case 'GET_RECOMENDED_BOOKS_SUCCESS':
          return {
              books:action.payload,loading:false
          }    
      case 'GET_RECOMENDED_BOOKS_FAILED':
          return {error:action.payload,loading:false}
      default:
          return state         
  }
}

const initialState = {
    authors: [],
    genres: [],
    departments: [],
    publishers: [],
    loading: false,
    error: null
  };
  
export const filterValuesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_FILTER_VALUES':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'GET_FILTER_VALUES_SUCCESS':
        return {
          ...state,
          authors: action.payload.authors,
          genres: action.payload.genres,
          departments: action.payload.departments,
          publishers: action.payload.publishers,
          loading: false
        };
      case 'GET_FILTER_VALUES_FAILED':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };