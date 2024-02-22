
import React from "react";
import GroupCard from "./GroupCard";
import { Link } from "react-router-dom";
const GroupsList = ({ groups }) => {
    return (
      <div className="flex flex-wrap flex-col -mx-2 w-full">
        {groups.map((group) => (
          <div key={group._id} className="px-2 mb-4 ">
          <Link to= {`/group/${group._id}`}><GroupCard group={group} /></Link>
          </div>
          ))}
          </div>
          );
          };
          
          export default GroupsList;