import React, { useState } from "react";
import { searchGroups } from "../../redux/reducers/groupSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
const dispatch = useDispatch(state => state)
const {error, status} = useSelector(state => state.group)
  const handleSearch = () => {
    dispatch(searchGroups(searchTerm));
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search groups"
            aria-label="Search groups"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        <button
  className="bg-purple hover:bg-faint-purple text-white text-sm font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
  type="button"
  onClick={handleSearch}
>
  Search
</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
