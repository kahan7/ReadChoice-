import React, { useState, useRef, useEffect } from "react";

const BookCard = ({ book }) => {
  const [showCard, setShowCard] = useState('true');
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard('none');
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);

  const handleCardClick = () => {
    setShowCard(!showCard);
  };

  return (
    <div
      className="book-card bg-white rounded-lg overflow-hidden shadow-md top-0 left-0"
      style={{ height: "100px", maxWidth: "500px", display:`${showCard}` }}
      ref={cardRef}
    >
      <hr className="w-full"></hr>
      <div className="book-cover flex  m-2" onClick={handleCardClick}>
        <div className="book-cover">
          <img
            src={book.cover_i}
            alt={book.title}
            className="w-20 h-20 object-cover"
          />
        </div>
        <div className="book-details p-4 flex flex-col justify-center">
          <h2 className="text-sm font-medium mb-2">{book.title}</h2>
          <p className="mb-2">
            <strong className="mr-2 text-sm">Author:</strong>{" "}
            {book.author_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
