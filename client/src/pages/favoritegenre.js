import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setHistorysearch, setQuery, setRecommendation } from '../redux/reducers/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { postDataAPI } from '../utils/fetchData';
import { POST_TYPES } from '../redux/actions/postAction';
import { message } from 'antd';

const genres = [
  'Christian Nonfiction',
  'Psychology',
  'Art',
  'Biography',
  'Business',
  'Chick Lit',
  'Children\'s',
  'Classics',
  'Comics',
  'Contemporary',
  'Cookbooks',
  'Crime',
  'Ebooks',
  'Fantasy',
  'Fiction',
  'Graphic Novels',
  'Historical Fiction',
  'History',
  'Horror',
  'Humor and Comedy',
  'Manga',
  'Memoir',
  'Music',
  'Mystery',
  'Paranormal',
  'Philosophy',
  'Poetry',
  'Religion',
  'Romance',
  'Science',
  'Science Fiction',
  'Self Help',
  'Suspense',
  'Spirituality',
  'Sports',
  'Thriller',
  'Travel',
  'Young Adult'
];

export const FavoriteGenre = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [checkboxState, setCheckboxState] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {auth, book} = useSelector (state=>state)
  const history = useNavigate()
const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      if (selectedGenres.length > 0) {
        setLoading(true);
    
        const relatedResponse = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${selectedGenres.join('+')}&maxResults=10&langRestrict=en+vi`
        );
        const relatedBooks = relatedResponse.data.items.map((book) => {
          const volumeInfo = book.volumeInfo;
          const authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown";
          const categories = volumeInfo.categories
            ? volumeInfo.categories.join(", ")
            : "Unknown";
            if (!authors || !categories) {
              return null; // Bỏ qua sách không có authors hoặc categories
            }
          const industryIdentifiers = volumeInfo.industryIdentifiers;
          const isbn = industryIdentifiers
            ? industryIdentifiers[0].identifier
            : "Unknown";
          const imageLinks = volumeInfo.imageLinks;
          const cover_i = imageLinks ? imageLinks.thumbnail : null;
          const epub = book.accessInfo.epub.isAvailable;
         const downloadLink = book.accessInfo.epub.acsTokenLink;
        const buyLink = book.saleInfo?.buyLink
          return {
            bookId: book.id,
            title: volumeInfo.title,
            author_name: authors,
            isbn,
            genre: categories,
            cover_i,
            epub,
            downloadLink,
            buyLink
          };
        }).filter((book) => book.cover_i !== null);
        dispatch(setRecommendation(relatedBooks))
  
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedGenres]);
  const handleContinue = async () => {
    if (selectedGenres.length === 0) {
      message.error('Vui lòng chọn ít nhất một thể loại');
      return;
    }
    try {

      setLoading(true);
    const response1 = await postDataAPI('books/search-history',{userId:auth.user._id,        searchTerm: selectedGenres.join('+'), })
const newbook2 =[...book.recommendedBooks].splice(0,4);
      const res = await postDataAPI('posts', {isFirstLogin: auth.user.isFirstLogin,recommendedBooks:newbook2}, auth.token) 
      dispatch({
        type: POST_TYPES.GET_POSTS, 
        payload: {posts:res.data}
    })

      history('/');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleCheckboxChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenres(
      selectedGenres.includes(selectedGenre)
        ? selectedGenres.filter((genre) => genre !== selectedGenre)
        : [...selectedGenres, selectedGenre]
    );
    setCheckboxState({ ...checkboxState, [event.target.name]: event.target.checked });
  };
  
  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <p className="mb-4 text-gray-500">
          We use your favorite genres to make better book recommendations and tailor what you see in your Updates feed.
        </p>
        <div className="grid grid-cols-4 gap-4">
          {genres.map((genre) => (
            <label
              key={genre}
              className={`block relative border-2 border-gray-200 rounded-lg p-2 text-center hover:bg-gray-100 cursor-pointer ${
                checkboxState[genre] ? 'bg-brown-200' : ''
              }`}
            >
              <input
                type="checkbox"
                className="absolute top-0 left-0 opacity-0"
                name={genre}
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleCheckboxChange}
              />
              <span className="block text-lg font-medium">{genre}</span>
              <span className="block mt-1 text-gray-500 text-sm">Select</span>
            </label>
          ))}
        </div>
      </div>
     
  <div className='flex justify-center items-center'>
<button onClick={handleContinue}className="py-2 px-4 rounded-md bg-brown-200 text-white font-medium hover:bg-brown-600 hover:text-white transition duration-300 ease-in-out">
  Continue
</button>
</div>
</div>
);
};
