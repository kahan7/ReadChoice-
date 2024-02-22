import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rate, Spin, Button } from "antd";
import { addBookToShelf } from "../redux/actions/bookshelfAction";
import { searchBooks, getBookDetails } from "../redux/reducers/booksSlice";
import { postDataAPI } from "../utils/fetchData";
import { Link, useNavigate } from "react-router-dom";
import BookFilter from "./Bookfilter";
import { submitRating } from "../redux/reducers/ratingSlice";
import Booklist from "./bookresults/booklist";
import { Menu } from "antd";

export const BookSection = React.memo(({ keyword }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { query, books, selectedBook, isLoading, error } = useSelector(
    (state) => state.book
  );

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      history("/search/" + selectedCategory);
      dispatch(searchBooks({ keyword: selectedCategory }));
    } else {
      dispatch(searchBooks({ keyword }));
    }
  }, [selectedCategory, keyword, dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const renderBookList = () => (
    <Booklist
      query={keyword}
      books={books}
      selectedBook={selectedBook}
      isLoading={isLoading}
      error={error}
    />
  );

  const renderLoadingError = () => {
    if (isLoading) {
      return <Spin tip="Loading..." />;
    } else if (error) {
      return <p>{error}</p>;
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="  col-md-8">
          {renderLoadingError()}
          <BookFilter
            onSelectCategory={handleCategorySelect}
            keyword={keyword}
          />
          {renderBookList()}
        </div>
        <div className=" col-md-4  mt-4">
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-md font-bold mb-2">List of book genres</h3>
            <Menu>
              <Menu.Item onClick={() => handleCategorySelect("Science")}>
                Science
              </Menu.Item>
              <Menu.Item onClick={() => handleCategorySelect("Literature")}>
                Literature
              </Menu.Item>
              <Menu.Item onClick={() => handleCategorySelect("Cosmic")}>
                Cosmic
              </Menu.Item>
              <Menu.Item onClick={() => handleCategorySelect("Politics")}>
                Politics
              </Menu.Item>
              <Menu.Item onClick={() => handleCategorySelect("Histories")}>
                Histories
              </Menu.Item>
              <Menu.Item onClick={() => handleCategorySelect("Religions")}>
                Religions
              </Menu.Item>
              <Menu.Item onClick={() => handleCategorySelect("Other")}>
                Other
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BookSection;
