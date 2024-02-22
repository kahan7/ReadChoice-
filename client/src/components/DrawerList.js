import React from 'react'

const DrawerList = () => {
  return (
    <div>
    <div class="flex items-center space-x-4">
     <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12H3m18-4H3m18 8H3m14-6h5.5a2.5 2.5 0 110 5H17"/></svg>
    
     <div className='row'>

 <div className='col-2'>
   <img className="" src={(`${book.coverImageURL}`)} />
 </div>
 <div className='col-10'>
   <h3 class="text-xl font-medium">{book.title}</h3>
   <p class="text-gray-600"></p>
   <p class="text-sm text-gray-600">Rate this book</p>
   <div class="flex space-x-1">
     <svg class="w-4 h-4 text-yellow-400" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.879l-6.023 3.638 1.448-6.747L2.926 9.242l6.794-.588L12 2.343l2.28 6.311 6.795.588-4.498 3.528 1.449 6.747z"/></svg>
     <svg class="w-4 h-4 text-yellow-400" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.879l-6.023 3.638 1.448-6.747L2.926 9.242l6.794-.588L12 2.343l2.28 6.311 6.795.588-4.498 3.528 1.449 6.747z"/></svg>
     <svg class="w-4 h-4 text-yellow-400" fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.879l-6.023 3.638 1.448-6.747L2.926 9.242l6.794-.588L12 2.343l2.28 6.311 6.795.588-4.498 3.528 1.449 6.747z"/></svg>
   </div>
 </div>
</div> 
</div></div>
  )
}

export default DrawerList