import React from 'react'

 const Bookshelf = () => {
  return (
    <div><div class="flex">
    <div class="w-1/3 p-4 border-r">
      <div class="mb-4">
        <h2 class="text-xl font-bold mb-2">Bookshelves (Edit)</h2>
        <ul>
          <li>All (7)</li>
          <li>Read (1)</li>
          <li>Currently Reading (1)</li>
          <li>Want to Read (5)</li>
        </ul>
        <div class="mt-4">
          <label for="shelf-select" class="block mb-2 font-bold">Select multiple</label>
          <select id="shelf-select" name="shelf-select" multiple class="w-full border p-2">
            <option value="1">All</option>
            <option value="2">Read</option>
            <option value="3">Currently Reading</option>
            <option value="4">Want to Read</option>
          </select>
        </div>
        <div class="mt-4">
          <button class="bg-blue-500 text-white py-2 px-4 rounded">Add shelf</button>
        </div>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-bold mb-2">Your reading activity (Edit)</h2>
        <ul>
          <li>Review Drafts</li>
          <li>Kindle Notes & Highlights</li>
          <li>Reading Challenge</li>
          <li>Year in Books</li>
          <li>Reading stats</li>
        </ul>
      </div>
    </div>
    <div class="w-2/3 p-4">
      <div class="flex mb-4">
        <div class="w-1/12"></div>
        <div class="w-5/12">Cover</div>
        <div class="w-2/12">Title</div>
        <div class="w-1/12">Author</div>
        <div class="w-1/12">Avg rating</div>
        <div class="w-1/12">Rating</div>
      </div>
      <div class="flex mb-4">
        <div class="w-1/12">1</div>
        <div class="w-5/12">Cover Image Here</div>
        <div class="w-2/12">Book Title</div>
        <div class="w-1/12">Book Author</div>
        <div class="w-1/12">4.5</div>
        <div class="w-1/12">5</div>
      </div>
      <div class="flex mb-4">
        <div class="w-1/12">2</div>
        <div class="w-5/12">Cover Image Here</div>
        <div class="w-2/12">Book Title</div>
        <div class="w-1/12">Book Author</div>
        <div class="w-1/12">3.8</div>
        <div class="w-1/12">4</div>
      </div>
      <div class="mt-4 flex">
        <div class="w-1/2">
          <label for="per-page-select" class="block mb-2 font-bold">Per page</label>
<select id="per-page-select" name="per-page-select" class="w-full border p-2">
<option value="10">10</option>
<option value="20">20</option>
<option value="30">30</option>
</select>
</div>
<div class="w-1/2">
<label for="sort-select" class="block mb-2 font-bold">Sort</label>
<select id="sort-select" name="sort-select" class="w-full border p-2">
<option value="recent">Recent</option>
<option value="title">Title</option>
<option value="author">Author</option>
</select>
</div>
</div>

  </div>
</div></div>
  )
}
export default Bookshelf