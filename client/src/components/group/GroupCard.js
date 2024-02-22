import React from "react";

const GroupCard = ({ group }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg h-1/2">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.name}</div>
        <p className="text-gray-700 text-base">{group.description}</p>
      </div>
      <div className="px-6 py-4">
       
      </div>
    </div>
  );
};

export default GroupCard;
