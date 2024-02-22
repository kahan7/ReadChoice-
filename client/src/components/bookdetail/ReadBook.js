import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ReadBook = () => {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const history = JSON.parse(
      localStorage.getItem(`book_${id}_history`) || "{}"
    );
    setPageNumber(history.currentPage + 1 || 1);
    const fetchBook = async () => {
      try {
        const result = await axios(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  const handleKeyDown = (event) => {
    // Bắt sự kiện bấm phím trái hoặc phải để chuyển trang
    if (event.keyCode === 37) {
      console.log("Up arrow key pressed");
      setPageNumber(pageNumber - 1);
      const history = { currentPage: pageNumber };
      localStorage.setItem(`book_${id}_history`, JSON.stringify(history));
    } else if (event.keyCode === 39) {
      console.log("Up arrow key pressed");
      // Phím phải
      setPageNumber(pageNumber + 1);

      const history = { currentPage: pageNumber };
      localStorage.setItem(`book_${id}_history`, JSON.stringify(history));
    }
  };
  function handlePreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);

      const history = { currentPage: pageNumber };
      localStorage.setItem(`book_${id}_history`, JSON.stringify(history));
    }
  }
  function handleNextPage() {
    setPageNumber(pageNumber + 1);
    const history = { currentPage: pageNumber };
    localStorage.setItem(`book_${id}_history`, JSON.stringify(history));
  }
  const onloadHanlder = () => {
    setLoading(false);
    window.addEventListener("keydown", handleKeyDown);
  };
  return (
    <>
      <div className="w-100 h-10 bg-brown flex items-center">
        {" "}
        <Link to={"/"}>
          {" "}
          <img
            src="https://res.cloudinary.com/dpzpv7tjr/image/upload/v1682266848/ReadChoice/logo_wvfeun.png"
            className="w-40 object-contain ml-2 hover:cursor"
          />
        </Link>{" "}
      </div>
      <div className="min-h-screen book-reader">
        <iframe
          className="w-full"
          title={id}
          src={`https://books.google.com/books?id=${id}&lpg=PP1&pg=PA${pageNumber}&output=embed`}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="auto"
          onLoad={onloadHanlder}
        />
        <div className="flex justify-between items-center min-h-screen ">
          <Button
            className="h-10 w-30 ml-40 btn-shift-page-book"
            icon={
              <LeftOutlined
                style={{ color: "white  " }}
                onClick={handlePreviousPage}
              />
            }
            style={{ backgroundColor: "#392415" }}
          />

          <Button
            className="h-10 w-20 mr-40 btn-shift-page-book"
            icon={
              <RightOutlined
                style={{ color: "white  " }}
                onClick={handleNextPage}
              />
            }
            style={{ backgroundColor: "#392415" }}
          />
        </div>

        {loading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spin />
          </div>
        )}
      </div>
    </>
  );
};

export default ReadBook;
