import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  recommendBooks,
  suggestbook,
  setQuery,
  searchBooks,
} from "../../redux/reducers/booksSlice";
import BookCard from "../BookCard";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const { user } = useSelector((state) => state.auth);
  const [query, setQueryValue] = useState("");
  const booksuggestion = useSelector((state) => state.book.booksuggestion);
  const dispatch = useDispatch();
  const history = useNavigate();
  const debouncedValue = useDebounce(query, 500);

  const handleonchangeSearch = (event) => {
    const query = event.target.value;
    setQueryValue(query);
  };
  useEffect(() => {
    dispatch(suggestbook(query));
  }, [debouncedValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      history("/search/" + query);
      dispatch(setQuery(query));
      dispatch(recommendBooks({ querybook: query, userId: user._id }));
    } else {
      history("/");
    }
  };

  return (
    <div className="md:w-1/4 w-full relative">
      <form className="search_form" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            name="search"
            value={query}
            id="search"
            title="Enter to Search"
            placeholder="Search books"
            onChange={handleonchangeSearch}
            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.472 11.528a6 6 0 111.414-1.414l4.853 4.853a1 1 0 01-1.414 1.414l-4.853-4.853zM10 16a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {booksuggestion && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b-md">
            {booksuggestion.slice(0, 4).map((book) => (
              <Link to={`/book/show/${book.bookId}`}>
                <BookCard key={book.bookId} book={book} />
              </Link>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
