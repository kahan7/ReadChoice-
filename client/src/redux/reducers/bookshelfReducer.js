import { updateDrawers ,updatedeleteDrawer,updateDrawerName} from "../actions/bookshelfAction";
import {
  UPDATE_DRAWER_REQUEST,
  UPDATE_DRAWER_SUCCESS,
  UPDATE_DRAWER_FAILURE,
  UPDATE_DRAWERNAME_REQUEST,
  UPDATE_DRAWERNAME_SUCCESS,
  UPDATE_DRAWERNAME_FAILURE,
} from '../actions/bookshelfAction';
import { message } from 'antd';
// Define initial state
const initialState = {
  drawers: [],
  loading: false,
  error: null,

};

// Define reducer function
const bookshelfReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKSHELVES_REQUEST':
      return { ...state, loading: true };
      
    case 'FETCH_BOOKSHELVES_SUCCESS':
      return { ...state, drawers: action.payload, loading: false };
    case 'FETCH_BOOKSHELVES_FAILURE':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_BOOK_TO_BOOKSHELF_REQUEST':
      return { ...state, loading: true };
      case 'ADD_DRAWER':
  return updateDrawers(state, action.payload);
   case 'DELETE_DRAWER':
    return updatedeleteDrawer(state, action.payload);
    case 'ADD_BOOK_TO_BOOKSHELF_SUCCESS':
     
      return {
        ...state,
        drawers: [...state.drawers,action.payload],
        loading: false,
        error:[],
      };
    case 'ADD_BOOK_TO_BOOKSHELF_FAILURE':
    
      return { ...state, error: action.payload, loading: false };
          case UPDATE_DRAWER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_DRAWER_SUCCESS:
      return {
        ...state,
        drawer: action.payload,
        loading: false,
        error: null
      };
    case UPDATE_DRAWER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      case UPDATE_DRAWER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case UPDATE_DRAWER_SUCCESS:
        return {
          ...state,
          drawer: action.payload,
          loading: false,
          error: null
        };
      case UPDATE_DRAWERNAME_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        case UPDATE_DRAWERNAME_SUCCESS:
          return {
            ...state,
            loading: false,
            drawers: state.drawers.map((drawer) => {
              if (drawer._id === action.payload._id) {
                return { ...drawer, name: action.payload.name };
              }
              return drawer;
            }),
            error: null
          };
        
        case UPDATE_DRAWERNAME_REQUEST: 
        return {
         ...state,
          loading: true,
          error: null
        }
    default:
      return state;
  }
};

export default bookshelfReducer;
