import { Spin, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { submitRating } from '../../redux/reducers/ratingSlice';
import { useDispatch, useSelector } from 'react-redux';

const Rating = ({ isLoading, averageRating, bookId,onRatingChange }) => {
  const [ratingValue, setRatingValue] = useState(averageRating);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setRatingValue(averageRating);
  }, [averageRating,bookId]);

  const handleRatingChange = (value) => {
    onRatingChange(value);
    setRatingValue(value);
    dispatch(submitRating({ bookId, rating: value, auth }));
  };

  return (
    <div>
      <div className="d-inline-block">
        <div className="row">
          <div className="col text-center">
            {isLoading ? (
              <Spin />
            ) : (
              <Rate allowHalf value={ratingValue} onChange={handleRatingChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
