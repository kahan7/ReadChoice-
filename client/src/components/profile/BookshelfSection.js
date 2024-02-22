import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDrawer, getbookshelf, updateDrawerNameAction } from '../../redux/actions/bookshelfAction';
import Rating from '../bookresults/rating';
import { Drawers } from './Drawer';
import { Button, Space,Dropdown ,Menu} from 'antd';
import { PlusOutlined, CloseOutlined, EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import { Modal, Input } from 'antd';
import {AddBookListModal} from './AddBookListModal';
const BookshelfSection = ({user,id,bookshelf, profile}) => {
  const dispatch = useDispatch()
  const { drawers,loading,error} = useSelector (state => state.bookshelf)
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { auth} = useSelector (state => state)
  const [visible, setVisible] = useState(false);
  const [bookLists, setBookLists] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

  const [editedBookshelfName, setEditedBookshelfName] = useState('');
const [selectedDrawerId ,setselectedDrawerId] =useState('');
const [selectedDrawerName ,setselectedDrawerName] =useState('');

  const handleEditModalOpen = (drawerId,drawerName) => {
    setEditedBookshelfName(bookshelf.name); // Đặt giá trị ban đầu của tên kệ sách trong ô nhập
    setEditModalVisible(true);
    setEditedBookshelfName(drawerName)
setselectedDrawerId(drawerId)
  };

  const handleEditModalSave = () => {
    dispatch(updateDrawerNameAction(auth.user._id,selectedDrawerId,editedBookshelfName))
    setEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };
  const handleDeleteDrawer = (drawerId) => {
   dispatch(deleteDrawer(user._id,drawerId))
  };
  const handleCreate = (bookListName) => {
    setBookLists([...bookLists, bookListName]);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };



  return (
    <div class="my-4 flex flex-col justify-center h-full">
    <Modal
      title="Edit Your Book List"
      visible={editModalVisible}
      onOk={handleEditModalSave}
      onCancel={handleEditModalCancel}
    >
      <Input
        value={editedBookshelfName}
        onChange={(e) => setEditedBookshelfName(e.target.value)}
      />
    </Modal>
    <AddBookListModal visible={visible} onCreate={handleCreate} onCancel={handleCancel} auth={auth} />
  
    <div className="flex justify-center">
      <h2 class="text-lg font-medium mb-2">{profile.users[0]?.fullname.toUpperCase()}'s Bookshelves</h2>
    </div>
  
    <div class="flex flex-col space-y-4 bg-white rounded-lg shadow-md hover:shadow-lg p-4 h-full">
      <button
        class="bg-purple w-25 hover:bg-faint-purple focus:bg-brown-dark text-white font-semibold py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline"
        onClick={() => setVisible(true)}
      >
        Add a book list
      </button>
  
      <div class="">
        {drawers?.map((drawer) => (
          <div key={drawer._id}>
            <div className="flex justify-between">
              <span className="text-xl font-medium ">
                {drawer.name && drawer.name === "Read" ? "Finished reading" : drawer.name}
              </span>
              <div className="nav-item dropdown mr-9">
                <span className="material-icons hover:cursor-pointer" id="moreLink" data-toggle="dropdown">
                  more_horiz
                </span>
                <div className="dropdown-menu mr-20">
                  <div className="dropdown-item cursor-pointer" onClick={(e) => handleDeleteDrawer(drawer._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </div>
                  <div className="dropdown-item cursor-pointer" onClick={(e) => handleEditModalOpen(drawer._id, drawer.name)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </div>
                </div>
              </div>
            </div>
            <Drawers drawer={drawer} />
            <hr className="mb-2 mt-1"></hr>
          </div>
        ))}
        {drawers && drawers.length === 0 && (
          <span>{user && user.fullname} doesn't have any book yet</span>
        )}
      </div>
    </div>
  </div>
  

  )
}

export default BookshelfSection