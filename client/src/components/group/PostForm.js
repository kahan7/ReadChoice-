import axios from 'axios';
import React, { useState } from 'react';
import { postDataAPI } from '../../utils/fetchData';
import { postAdded } from '../../redux/reducers/groupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useParams } from 'react-router-dom';
import { POST_TYPES } from '../../redux/actions/bookshelfAction';
import { useForm } from 'react-hook-form';
import { message, Modal } from 'antd';

function PostForm({ auth, groupId }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [books, setBooks] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    content: '',
    book: null,
    groupId: groupId,
  });

  const handleChangeTitle = (event) => {
    const title = event.target.value;

    if (title.length > 2) {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=5&langRestrict=en+vi`)
        .then((response) => response.json())
        .then((data) => {
          const filteredBooks = data.items.filter(book => book.volumeInfo.imageLinks);
          setBooks(filteredBooks);
        });
    } else {
      setBooks([]);
    }
  };

  const handleSelectBook = (book) => {
    document.getElementById('title').value = book.volumeInfo.title;
    setFormData({ ...formData, book: book });
    setBooks([]);
  };

  const submitFormHandler = handleSubmit(async (data) => {
    try {
      const response = await postDataAPI('posts', { ...formData, ...data }, auth.token);

      if (!groupId) {
        dispatch({ type: POST_TYPES.CREATE_POST, payload: response.data });
      } else {
        dispatch(postAdded(response.data));
      }

    } catch (error) {
      console.error(error);
    }
  });

  const closeModal = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false
    });
  };

  return (
    <Modal
      visible={true}
      onCancel={closeModal}
      footer={null}
      centered
    >
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Book Name</label>
          <div className="mt-1 relative">
            <input
              id="title"
              name="title"
              type="text"
              required
              className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2 ${errors.title ? 'border-red-500' : ''}`}
              {...register('title', { required: true })}
              onChange={handleChangeTitle}
            />
            {errors.title && <span className="text-red-500">Book Name is required.</span>}

            {books.length > 0 && (
              <ul className="absolute z-10 top-full left-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 w-full max-h-40 overflow-y-auto">
                {books.map((book) => (
                  <li
                    key={book.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectBook(book)}
                  >
                    {book.volumeInfo.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <div className="mt-1">
            <textarea
              id="content"
              name="content"
              rows="10"
              required
              className={`w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2 ${errors.content ? 'border-red-500' : ''}`}
              {...register('content', { required: true })}
            ></textarea>
            {errors.content && <span className="text-red-500">Content is required.</span>}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PostForm;
