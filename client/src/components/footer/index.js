import React from 'react'

const index = () => {
  return (
    <div class=''>
    <footer class="bg-#434344 pt-3  pb-2 lg:pb-0 lg:h-46 flex-shrink-0 ">
      <div class="container mx-auto flex flex-wrap lg:flex-nowrap justify-between">
        <div class="w-full lg:w-1/4 mb-6 lg:mb-0">
          <h3 class="text-white font-bold text-2xl mb-4">ReadChoice</h3>
          <p class="text-gray-400">A social network for book lovers</p>
        </div>
        <div class="w-full lg:w-1/4 mb-6 lg:mb-0">
          <h3 class="text-white font-bold text-lg mb-4">Useful Links</h3>
          <ul class="list-none">
            <li><a href="#" class="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Browse Books</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">My Bookshelf</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Settings</a></li>
          </ul>
        </div>
        <div class="w-full lg:w-1/4 mb-6 lg:mb-0">
          <h3 class="text-white font-bold text-lg mb-4">Follow Us</h3>
          <ul class="list-none">
            <li><a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i> Facebook</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
        <div class="w-full lg:w-1/4 mb-6 lg:mb-0">
          <h3 class="text-white font-bold text-lg mb-4">Contact Us</h3>
          <ul class="list-none">
            <li><a href="#" class="text-gray-400 hover:text-white">Email: contact@bookshelf.com</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Phone: +1 123-456-7890</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Address: 123 Main St, New York, NY</a></li>
          </ul>
        </div>
      </div>
      <div class="bg-#656060 px-6 py-2 lg:px-12">
        <p class="text-gray-400 mb-0 text-center lg:text-left">&copy; 2023 Bookshelf. All rights reserved.</p>
      </div>
    </footer>
  </div>
  
  )
}

export default index