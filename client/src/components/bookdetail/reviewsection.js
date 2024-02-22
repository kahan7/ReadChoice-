import { Spin, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../redux/reducers/reviewSlice";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Rating from "../bookresults/rating";
import { useForm } from "react-hook-form";

const Reviewsection = ({ bookId }) => {
  const { user } = useSelector((state) => state.auth);
  const { selectedBook } = useSelector((state) => state.book);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.review);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const onSubmit = (data) => {
    dispatch(
      addReview({
        userId: user._id,
        bookId,
        reviewText: data.review,
        rating: rating,
      })
    );
    setReviewText("");
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <div>
      <div className="mt-2 py-8 bg-white rounded-lg shadow-md hover:shadow-lg p-4">
        <h2 className="rating-review-text text-2xl font-bold text-center">
          Ratings & Reviews
        </h2>
        <div className="flex justify-center mb-4">
          <Rating
            averageRating={selectedBook.averageRating}
            bookId={bookId}
            onRatingChange={handleRatingChange}
          />
        </div>
        <div className="max-w-lg mx-auto">
          <div className="border-b-2 border-gray-300 pb-4 mb-4">
            <h3 className="text-md text-center font-bold mb-2">My Review</h3>
            <p className="text-gray-600 mb-2 text-center">{user.fullname}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <label className="block font-bold mb-2" htmlFor="review">
              Write a Review
            </label>
            <textarea
              className={`w-full px-3 py-2 border ${
                errors.review ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
              id="review"
              name="review"
              rows="4"
              onChange={(event) => setReviewText(event.target.value)}
              {...register("review", { required: true })}
            ></textarea>
          </form>
          {isLoading ? (
            <Spin />
          ) : (
            <button
              className="mt-4 bg-purple hover:bg-faint-purple text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              type="submit"
            >
              Submit Review
            </button>
          )}
          {errors.review && (
            <span className="text-red-500"> Please enter your review.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviewsection;
