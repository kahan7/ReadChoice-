import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../components/alert/Toast";
import { addBook } from "../../redux/actions/bookAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
function AddformData() {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const book = useSelector((state) => state.book);
  const error = useSelector((state) => state.error);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
    genre: "",
    description: "",
    coverImage: "",
    rating: "",
    review: "",
    status: "want-to-read",
    series: "",
    seriesNumber: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addBook(formData));
  };
  const handleCancel = (event) => {
    event.preventDefault();
    // Handle form submission to backend API
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  };

  return (
    <div>
      {alert.success && (
        <Toast
          msg={{ title: "Added successfully", body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
      {alert.error && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 font-bold mb-2"
          >
            Author:
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isbn" className="block text-gray-700 font-bold mb-2">
            ISBN:
          </label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="publicationDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Publication Date:
          </label>
          <input
            type="date"
            name="publicationDate"
            id="publicationDate"
            required
            value={formData.publicationDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 font-bold mb-2">
            Genre:
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="coverImage"
            className="block text-gray-700 font-bold mb-2"
          >
            Cover Image URL:
          </label>
          <input
            type="text"
            name="coverImage"
            id="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="series"
            className="block text-gray-700 font-bold mb-2"
          >
            Series:
          </label>
          <input
            type="text"
            name="series"
            id="series"
            value={formData.series}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seriesNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Series Number:
          </label>
          <input
            type="number"
            name="seriesNumber"
            id="seriesNumber"
            value={formData.seriesNumber}
            onChange={handleChange}
            min="1"
            className="shadow appearance-none border rounded w-full py-2px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add formData
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddformData;
