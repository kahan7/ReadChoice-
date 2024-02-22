import React, { useEffect } from 'react'
import SearchBox from '../components/group/SearchBox'
import GroupsList from '../components/group/GroupsList'
import { fetchGroupsAsync } from '../redux/reducers/groupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Searchgroup() {
  
  const groups = useSelector(state =>state.group.groups)
  const dispatch = useDispatch();
 useEffect( () => {
dispatch(fetchGroupsAsync())
 },[])
  return (
    <div>
      <Link to={`/group/new`}><button className='btn bg-purple hover:bg-faint-purple text-white text-sm font-semibold '>Create Group</button></Link>
        <SearchBox/>
     <GroupsList groups={groups}/>
    </div>
  )
}

export default Searchgroup