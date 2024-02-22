const initialState = {
    books: [],
    loading:false,
    error: null,
    rating: [],
  }
  export const SEARCH_BOOKS_REQUEST = 'SEARCH_BOOKS_REQUEST';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';
export const SEARCH_BOOKS_FAILURE = 'SEARCH_BOOKS_FAILURE';
  
  const bookReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'BOOK_ADDED':
        return { ...state, book: action.payload, error: null };
      case 'BOOK_ADD_ERROR':
        return { ...state, error: action.payload };
      default:
        return state;
    case SEARCH_BOOKS_REQUEST:
      return { ...state, loading: true };
    case SEARCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books:action.payload, error: [], rating: action.payload };
    case SEARCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload,books:[] };
      
    }
  }
  export default bookReducer