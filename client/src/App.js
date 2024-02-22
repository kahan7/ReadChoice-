import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router,Routes, Route,useLocation} from 'react-router-dom'
import  Home  from './pages/home';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';
import { BookSection } from './components/BookSection';
import Login from './pages/login'
import Register from './pages/register';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';
import  Header from './components/header/Header';
import Alert from './components/alert/Alert'
import Status from './components/home/Status';
import StatusModal from './components/StatusModal'
import { getPosts } from './redux/actions/postAction'
import { SearchScreen } from './pages/SearchScreen';
import Bookshelf from './pages/bookshelf';
import { Friends } from './pages/friends';
import Bookdetail from './pages/Bookdetail';
import {FavoriteGenre} from './pages/favoritegenre';
import ReadBook from './components/bookdetail/ReadBook';
import Footer from './components/footer'
import  {Group}  from  './pages/group';
import Searchgroup from './pages/searchgroup';
import GroupForm from './components/group/GroupForm';
import SocketClient from './SocketClient'
import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import PostForm from './components/group/PostForm';
import Peer from 'peerjs'
import AdminPanel from './pages/adminpanel';
import { POST_TYPES, getbookshelf } from './redux/actions/bookshelfAction';
import Discussion from './components/group/Discussion';
import { URL } from './utils/Url';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/*" element={<DefaultLayout />} />  
      <Route exact path="/book/:id" element={<ReadBook/>} /></Routes>
    </Router>
  

  );
  function DefaultLayout() {
    
const {auth,status} = useSelector(state =>state) 
const dispatch = useDispatch()
useEffect(() => {
  dispatch(refreshToken())
  const socket = io(`${URL}`);
  dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
  return () => socket.close()
},[dispatch])
useEffect(() => {
  if(auth.token) {
    
    dispatch(getPosts(auth.token))
    dispatch(getbookshelf(auth.user._id, auth));
  }
}, [dispatch, auth.token])
useEffect(() => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {}
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {}
    });
  }
},[])
useEffect(() => {
  const newPeer = new Peer(undefined, {
    path: '/', secure: true
  })
  
  dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
},[dispatch])
  return (
    <>
    
    <Alert/>
   
   <div className="App" style={{backgroundColor: '#f0f2f5'}}>
   <div className='flex flex-col'>
    
     {auth.token && <Header />}

<div className='flex  justify-center  m-3 min-h-screen relative '>
{status && <PostForm auth={auth}/>}

{auth.token && <SocketClient />}
     <Routes>
     <Route exact path="/" element={auth.token ? <Home/> : <Login/>}/>
     <Route exact path="/register" element={<Register/>} />
     <Route path="/search/:keyword" element={auth.token ? <SearchScreen/>:<Login/>} exact />
     <Route path="/bookself" element={auth.token ? <Bookshelf/>: <Login/>} exact />
     <Route path="/friends" element={auth.token ? <Friends/>:<Login/>} exact />
     <Route path="/user/edit_fav_genres" element={auth.token ? <FavoriteGenre/>:<Login/>} exact />
     <Route path="/book/show/:id" element={auth.token ? <Bookdetail/>:<Login/>} exact />
     <Route exact path="/:page" element={<PageRender/>}/>
     <Route exact path="/:page/:id" element={<PageRender/>}/>
     <Route exact path="/group/:id" element={auth.token ? <Group/>:<Login/>}/>
     <Route exact path="/search/groups" element={auth.token ? <Searchgroup/>:<Login/>}/>
     <Route exact path="/group/new" element={auth.token ? <GroupForm/>:<Login/>}/>
      <Route exact path="/group/new" element={auth.token ? <GroupForm/>:<Login/>}/>
      <Route exact path="/group/:groupId/discussion/:id" element={auth.token ? <Discussion/>:<Login/>}/>
     
     <Route exact path="/admindashboard" element={auth.token ? <AdminPanel/>:<Login/>}/>
     </Routes>
   
     </div>
     </div>
   
   </div>
    </>
  );
}

}

export default App;


