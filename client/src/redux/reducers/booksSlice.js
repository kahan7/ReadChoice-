import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { URL } from "../../utils/Url";
// Define initial state
const initialState = {
  query: "",
  books: [],
  readablebooks: [],
  booksuggestion: [],

  selectedBook: null,
  selectedGenre: "All",
  isLoading: false,
  error: null,
  recommendedBooks: [],
  historysearch: [],
};

// Define async thunk for recommending books
export const getSearchHistory = createAsyncThunk(
  "books/getquery",
  async (userId) => {
    try {
      const response1 = await getDataAPI(`books/search-history/${userId}`);
      return response1.data;
    } catch (e) {
      throw new Error(e);
    }
  }
);
export const recommendBooks = createAsyncThunk(
  "books/recommendBooks",
  async ({ querybook, userId }) => {
    try {
      const response1 = await postDataAPI("books/search-history", {
        userId: userId,
        searchTerm: querybook,
      });

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${querybook}&maxResults=1&langRestrict=en+vi`
      );
      if (response.status >= 200 && response.status < 300) {
        const response1 = await postDataAPI("books/search-history", {
          userId: userId,
          searchTerm: querybook,
        });
      }
      const book = response.data.items[0].volumeInfo;
      const author = book.authors ? book.authors[0] : "";
      const genre = book.categories ? book.categories[0] : "";
      const query = `${author} ${genre}`;

      const relatedResponse = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&langRestrict=en+vi`
      );
      const relatedBooks = relatedResponse.data.items
        .map((book) => {
          const volumeInfo = book.volumeInfo;
          const authors = volumeInfo.authors
            ? volumeInfo.authors.join(", ")
            : "Unknown";
          const categories = volumeInfo.categories
            ? volumeInfo.categories.join(", ")
            : "Unknown";
          const industryIdentifiers = volumeInfo.industryIdentifiers;
          const isbn = industryIdentifiers
            ? industryIdentifiers[0].identifier
            : "Unknown";
          const imageLinks = volumeInfo.imageLinks;
          const cover_i = imageLinks ? imageLinks.thumbnail : null;
          const epub = book.accessInfo.epub.isAvailable;

          return {
            bookId: book.id,
            title: volumeInfo.title,
            author_name: authors,
            isbn,
            genre: categories,
            cover_i,
            epub,
          };
        })
        .filter((book) => book.cover_i !== null);

      return relatedBooks;
    } catch (error) {
      throw new Error("No results were founded.");
    }
  }
);
export const suggestbook = createAsyncThunk(
  "books/suggestbook",
  async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en+vi`
      );
      const books = response.data.items
        .map((book) => {
          return {
            bookId: book.id,
            title: book.volumeInfo.title,
            author_name: book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown",
            isbn: book.volumeInfo.industryIdentifiers
              ? book.volumeInfo.industryIdentifiers[0].identifier
              : "Unknown",
            genre: book.volumeInfo.categories
              ? book.volumeInfo.categories.join(", ")
              : "Unknown",
            cover_i: book.volumeInfo.imageLinks?.thumbnail ?? null,
            epub: book.accessInfo.epub.isAvailable,
          };
        })
        .filter((book) => book.cover_i !== null);

      return books;
    } catch (error) {
      throw new Error("");
    }
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async ({ keyword, value }) => {
    try {
      let response;
      if (value) {
        response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=30&langRestrict=en+vi&orderBy=${value}`
        );
      } else {
        response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&langRestrict=en+vi`
        );
      }
      console.log(response.data);
      const books = response.data.items
        .map((book) => {
          return {
            bookId: book.id,
            title: book.volumeInfo.title,
            author_name: book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown",
            isbn: book.volumeInfo.industryIdentifiers
              ? book.volumeInfo.industryIdentifiers[0].identifier
              : "Unknown",
            genre: book.volumeInfo.categories
              ? book.volumeInfo.categories.join(", ")
              : "Unknown",

            cover_i: book.volumeInfo.imageLinks?.thumbnail ?? null,
            epub: book.accessInfo.epub.isAvailable,
            buyLink: book.saleInfo?.buyLink,
            averageRating: book.volumeInfo.averageRating
              ? book.volumeInfo.averageRating
              : 0,
          };
        })
        .filter((book) => book.cover_i !== null);

      return books;
    } catch (error) {
      throw new Error("Failed to search books.");
    }
  }
);

// Define async thunk for getting book details
export const getBookDetails = createAsyncThunk(
  "books/getBookDetails",
  async (bookId) => {
    console.log(bookId);
    try {
      const response = await axios.get(`${URL}/api/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get book details.");
    }
  }
);
// Define booksSlice
export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      return {
        ...state,
        query: action.payload,
      };
    },
    setRecommendation: (state, action) => {
      return {
        ...state,
        recommendedBooks: [...state.recommendedBooks, ...action.payload],
      };
    },
    setHistorysearch: (state, action) => {
      return {
        ...state,
        historysearch: [...state.historysearch, action.payload],
      };
    },
    updateAveragerating: (state, action) => {
      const { bookId, newRating } = action.payload;
      const bookIndex = state.books.findIndex((book) => book.bookId === bookId);
      if (bookIndex !== -1) {
        const updatedBook = {
          ...state.books[bookIndex],
          averageRating: newRating,
        };
        const updatedBooks = [...state.books];
        updatedBooks[bookIndex] = updatedBook;
        return {
          ...state,
          books: updatedBooks,
        };
      }
      return state;
    },
    filterReadableBooks: (state, action) => {
      const readableBooks = state.books.filter((book) => book.epub === true);
      return {
        ...state,
        books: readableBooks,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(suggestbook.pending, (state) => {
        state.error = null;
      })
      .addCase(getSearchHistory.pending, (state) => {
        state.error = null;
      })
      .addCase(suggestbook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksuggestion = action.payload;
        state.error = null;
      })
      .addCase(getSearchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.query = action.payload;
        state.error = null;
      })
      .addCase(getSearchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.query = [];
        state.error = action.error.message;
      })
      .addCase(suggestbook.rejected, (state, action) => {
        state.isLoading = false;
        state.booksuggestion = [];
        state.error = action.error.message;
      })
      .addCase(searchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        state.error = null;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.books = [];
        state.error = action.error.message;
      })
      .addCase(getBookDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;
        state.error = null;
      })
      .addCase(getBookDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.selectedBook = null;
        state.error = action.error.message;
      })
      .addCase(recommendBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recommendBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedBooks = action.payload;
        state.error = null;
      })
      .addCase(recommendBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const {
  setQuery,
  setHistorysearch,
  filterReadableBooks,
  updateAveragerating,
  setRecommendation,
} = booksSlice.actions;
export default booksSlice.reducer;
