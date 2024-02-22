import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShareBookModal from '../bookresults/ShareBookModal';
export const Drawers = ({ drawer }) => {
  const [numBooks, setNumBooks] = useState(3);
  const [showMore, setShowMore] = useState(true);

  const handleShowMore = () => {
    setNumBooks(numBooks + 6);
    setShowMore(false)
  };

  const handleShowLess = () => {
    setNumBooks(3);
    setShowMore(true)
  };

  return (
    <>
      <div className="grid gap-4 mt-2 mb-2 ">
        {drawer.books.slice(0, numBooks).map((book) => (
          <div className="flex items-center space-x-4">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12H3m18-4H3m18 8H3m14-6h5.5a2.5 2.5 0 110 5H17"
              />
            </svg>
            <Link to={`/book/show/${book.googleBooksId}`}>
            <div className="flex items-center space-x-4">
  <div className="flex-none w-16 h-24">
    <img className="w-full h-full object-cover" src={book.coverImage} alt={book.title} />
  </div>
  <div className="flex-1">
    <h3 className="text-xl font-medium">{book.title}</h3>
    <p className="text-gray-600">by {book.author}</p>

  </div>
</div>

           
            </Link>
          </div>
        ))}
      </div>
      {drawer.books.length > numBooks && showMore && (
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowMore}>More</button>
        </div>
      )}
      {!showMore && (
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowLess}>Close</button>
        </div>
      )}
    </>
  );
};
