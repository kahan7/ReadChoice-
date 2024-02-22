import React, { useEffect } from 'react'
import { BookSection } from '../components/BookSection'
import { useParams } from 'react-router-dom';

export const SearchScreen = () => {
  const { keyword } = useParams();
useEffect(()=> {
})
  return (
    <>
      <div className='w-3/4'>
      <BookSection keyword={keyword} />
      </div>
    </>
  )
}
