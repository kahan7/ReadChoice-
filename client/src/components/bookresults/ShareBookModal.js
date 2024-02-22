import { useState, useEffect } from 'react';
import { Modal, Button, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/actions/messageAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
function ShareBookModal({book}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [followingUsers, setFollowingUsers] = useState([]);
  const dispatch = useDispatch();
  const { auth, message, theme, socket, peer } = useSelector(state => state)
const {user} = useSelector(state=> state.auth)
  useEffect(() => {
    // Call API to get following users
      setFollowingUsers(user.following);

  }, []);
  useEffect(() => {
    // Call API to get following users
      setFollowingUsers(user.following);

  }, [book,auth]);

  const handleShareClick =  async (recipientId) => {
    // Call API to share book with selected user
    const msg = {
      sender: auth.user._id,
      recipient: recipientId,
      text: auth.user.fullname + " shared a book" , 
      book: book,
      media:[],
      createdAt: new Date().toISOString()
  }
console.log(book)
console.log(msg)
await  dispatch(addMessage({msg,auth,socket}))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button  className="bg-purple hover:bg-faint-purple text-white" onClick={() => setIsModalVisible(true)}>
       <span className='mr-2'> Share     </span>  <FontAwesomeIcon icon={faShare} />
      </Button>
      <Modal title="Select a user to share with" visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <List
  itemLayout="horizontal"
  dataSource={followingUsers}
  renderItem={user => {
    if (user.username === "ReadChoice") {
      return null; // Không hiển thị phần tử nếu user.username là "ReadChoice"
    }
    return (
      <List.Item>
        <List.Item.Meta
          title={user.username}
          description={user.email}
        />
        <Button onClick={() => handleShareClick(user._id)}>Share</Button>
      </List.Item>
    );
  }}
/>

        
      </Modal>
    </>
  );
}

export default ShareBookModal;
