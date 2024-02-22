import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadIcon from '../images/loading.gif'
import UserCard from '../components/UserCard'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { getDataAPI } from '../utils/fetchData'
import { Link } from 'react-router-dom'

export const Friends = () => {
  
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const { auth ,message,online} = useSelector(state => state)
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)

  const handleSearch = async (e) => {
      e.preventDefault()
      if(!search) return;

      try {
          setLoad(true)
          const res = await getDataAPI(`search?username=${search}`, auth.token)
          setUsers(res.data.users)
          setLoad(false)
      } catch (err) {
          dispatch({
              type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
          })
      }
  }
  const handleClose = () => {
      setSearch('')
      setUsers([])
  }
  return (
    <div className="container mx-auto my-8">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-8">
        <div className="font-bold mb-4">Find People</div>
        <form className="relative" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            value={search}
            id="search"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter to search"
            onChange={(e) =>
              setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
            }
          />
          <button
            type="button"
            className={`absolute top-2 right-2 ${
              users.length === 0 ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleClose}
          >
            &times;
          </button>
          {load && (
            <img
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              src={LoadIcon}
              alt="loading"
            />
          )}
          {search && (
            <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
              {users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  border="border-b border-gray-200 last:border-0"
                  handleClose={handleClose}
                />
              ))}
            </div>
          )}
        </form>
        <div className="font-bold my-4">Following</div>
      { auth && auth.user && auth.user.following.filter(user => user.fullname !== 'ReadChoice').map((user) => (
          <>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <li className="bg-white rounded-md shadow-md">
         <Link to={`/profile/${user._id}`}> <div className="flex items-center mb-2 p-4">
              <img
                src={`${user.avatar}`}
                alt="Friend avatar"
                className="w-10 h-10 rounded-full mr-2 object-contain"
              />
              <div className="font-semibold text-lg">{user.fullname}</div>
            </div>
            </Link>  
          
         
          {online.includes(user._id) ? (
           <div className="text-gray-500 px-4 pb-4 flex flex-row justify-between"><h5>Online</h5>  <i className="fas fa-circle text-success" /></div>
  
) : (
 <div className="text-gray-500 px-4 pb-4 flex flex-row justify-between">Offline  <i className="fas fa-circle " /></div>
   
)}
 </li>
                                        
          {/* Repeat the above list item for each friend */}
        </ul>
</>
              )      )}
                   </div>
        </div></div>)
}

