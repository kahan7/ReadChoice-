import axios from 'axios';
import { getDataAPI, postDataAPI } from '../../utils/fetchData';
import { URL } from '../../utils/Url';
export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
  FILTER_POST: 'FILTER_POST'
  
}

export const UPDATE_DRAWER_REQUEST = 'UPDATE_DRAWER_REQUEST';
export const UPDATE_DRAWER_SUCCESS = 'UPDATE_DRAWER_SUCCESS';
export const UPDATE_DRAWER_FAILURE = 'UPDATE_DRAWER_FAILURE';
export const UPDATE_DRAWERNAME_REQUEST = 'UPDATE_DRAWERNAME_REQUEST';
export const UPDATE_DRAWERNAME_SUCCESS = 'UPDATE_DRAWERNAME_SUCCESS';
export const UPDATE_DRAWERNAME_FAILURE = 'UPDATE_DRAWERNAME_FAILURE';

export const addBookToShelf = ({name, user_id,book,auth}) =>async (dispatch) => {
    const data = {drawerName:name, userId:user_id,book} ;
  
    dispatch({ type: 'ADD_BOOK_TO_BOOKSHELF_REQUEST' });
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
    try {
    const response =  await postDataAPI(`bookshelf/books`, data, auth.token)
    console.log(response.data)
        dispatch({
          type: 'ADD_BOOK_TO_BOOKSHELF_SUCCESS',
          payload: response.data
        });
        const res = await getDataAPI('posts', auth.token)
        
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
      }catch(error) {
        const errorMessage = error.response.data.msg;
        dispatch({
          type: 'ADD_BOOK_TO_BOOKSHELF_FAILURE',
          payload: errorMessage
        });
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
      };
    };
    
export const getbookshelf = (userId,auth) =>async (dispatch) => {

  dispatch({ type: 'FETCH_BOOKSHELVES_REQUEST' });
  try {
  const response =  await getDataAPI(`bookshelf/books/${userId}`, auth.token)
 
      dispatch({
        type: 'FETCH_BOOKSHELVES_SUCCESS',
        payload: response.data
      });
    }catch(error) {
  
      const errorMessage = error.response.data.msg;
      dispatch({
        type: 'FETCH_BOOKSHELVES_FAILURE',
        payload: errorMessage
      });
    };
  }
  export const updateDrawers = (state, newDrawer) => {
    // Tạo một bản sao mới của state
    const newState = { ...state };
    // Tạo một bản sao mới của mảng drawers
    const newDrawers = [...newState.drawers];
    // Thêm drawer mới vào mảng drawers
    newDrawers.push(newDrawer);
    // Cập nhật lại state
    newState.drawers = newDrawers;
    return newState;
  }
  export const updatedeleteDrawer = (state, deletedDrawerId) => {
 
    // Create a new copy of the state
    const newState = { ...state };
    // Create a new copy of the drawers array
    const newDrawers = [...newState.drawers];
    // Find the index of the deleted drawer
    const deletedDrawerIndex = newDrawers.findIndex((drawer) => drawer._id === deletedDrawerId);
    // If the deleted drawer is found, remove it from the array
    if (deletedDrawerIndex !== -1) {
      newDrawers.splice(deletedDrawerIndex, 1);
    }
    // Update the state with the updated drawers array
    newState.drawers = newDrawers;
    return newState;
  };
  export const updateDrawerName = (state, drawerId, newName) => {
    // Tạo một bản sao mới của state
    const newState = { ...state };
    // Tạo một bản sao mới của mảng drawers
    const newDrawers = [...newState.drawers];
    // Tìm vị trí của drawer cần cập nhật tên
    const updatedDrawerIndex = newDrawers.findIndex((drawer) => drawer.id === drawerId);
    // Nếu drawer cần cập nhật được tìm thấy, cập nhật tên mới
    if (updatedDrawerIndex !== -1) {
      newDrawers[updatedDrawerIndex].name = newName;
    }
    // Cập nhật lại state với mảng drawers đã được cập nhật
    newState.drawers = newDrawers;
    return newState;
  };
  
  // actions.js

export const deleteDrawer = (userId, drawerId) => {
  return async (dispatch) => {
    try {
      // Make the API request to delete the drawer
      const response = await axios.delete(`${URL}/api/bookshelves/${userId}/drawers/${drawerId}`);
console.log(drawerId)
      dispatch( { type: 'DELETE_DRAWER' , payload:drawerId  });
    } catch (error) {
      console.error(error);
      dispatch(deleteDrawerFailure());
    }
  };
};
export const updateDrawerNameAction = (userId, drawerId, newName) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DRAWERNAME_REQUEST });

    try {
      const response = await axios.put(`${URL}/api/bookshelves/${userId}/drawers/${drawerId}`, { name: newName });
      const updatedDrawer = response.data;

      dispatch({ type: UPDATE_DRAWERNAME_SUCCESS, payload: updatedDrawer });
    } catch (error) {
      console.error(error);
      dispatch({ type: UPDATE_DRAWERNAME_FAILURE });
    }
  };
};
export const deleteDrawerSuccess = (drawerId) => {
  return { type: 'DELETE_DRAWER' , payload:drawerId  };
};

export const deleteDrawerFailure = () => {
  return { type: 'DELETE_DRAWER_FAILURE' };
};
