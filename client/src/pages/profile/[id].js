import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Info from '../../components/profile/Info';
import BookshelfSection from '../../components/profile/BookshelfSection';
import ActivitiesSection from '../../components/profile/ActivitiesSection';
import LoadIcon from '../../images/loading.gif';

import { PROFILE_TYPES, getProfileUsers } from '../../redux/actions/profileAction';
import { POST_TYPES, getbookshelf } from '../../redux/actions/bookshelfAction';

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, auth } = useSelector((state) => state);
  const  {bookshelf}  = useSelector((state) => state);

  useEffect(() => {
   
    dispatch(getProfileUsers({ id, auth }));
    dispatch(getbookshelf(id, auth));
  }, [ id,dispatch]);

  return (
<div className="w-full">
  <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <ActivitiesSection userId={id} user={auth.user} posts={profile.posts?.posts} />
      </div>
      <div className="col-md-6 col-sm-12">
        <BookshelfSection user={auth.user} profile={profile} id={id} bookshelf={bookshelf} />
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
