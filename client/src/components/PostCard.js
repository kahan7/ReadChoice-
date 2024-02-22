import React from "react";
import CardHeader from "./home/post_card/CardHeader";
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";
import Comments from "./home/Comments";
import InputComment from "./home/InputComment";

const PostCard = ({ post, theme }) => {
  return (
    <div className=" my-3 bg-white rounded-lg shadow-md hover:shadow-lg ">
      <CardHeader post={post} />
      <CardBody post={post} theme={theme} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
