import React from 'react'
import PostCard from '../PostCard'
import { useSelector } from 'react-redux';

const ActivitiesSection = ({user,posts}) => {
  
  const { theme } = useSelector((state) => state);
  return (
    <div class="my-4 flex flex-col justify-center  h-full">
    <div className='flex justify-center '><h2 class="text-lg font-medium mb-2 ml-3">RECENT ACTIVITIES</h2></div>
    <div class="flex flex-col  bg-white rounded-lg shadow-md hover:shadow-lg p-4  h-full ">  
    {posts && posts
  .filter(post =>  
    post.status !== "Want to Read" &&  post.status !== "finished reading" && post.status !== "Currently reading"
  )
  .map(post => (
    <div className="posts ">
      <PostCard post={post} theme={theme}/>
    </div>
  ))
}

{posts && posts.length ==0  &&( <span>{user && user.fullname} doesn't have any post yet </span>)}
      </div>
</div>
  )
}
export default ActivitiesSection