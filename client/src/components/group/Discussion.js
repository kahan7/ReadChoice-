import React, { useEffect, useRef, useState } from 'react';
import { Input, List } from 'antd';
import DisscussionSection from './DisscussionSection';
import RightSide from '../../components/message/RightSide'

import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, selectMessages } from '../../redux/reducers/discussionSlice'
import io from 'socket.io-client';
import { Typography } from 'antd';
import { URL } from '../../utils/Url';
const { Title } = Typography;


const socket = io(`${URL}`);
function Discussion() {
  const dispatch = useDispatch();
  const {groupId} = useParams()
  const auth = useSelector(state=> state.auth)
  const messages = useSelector(selectMessages);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  useEffect(() => {

    socket.on('message', (data) => {
      dispatch(addMessage(data));
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const data = {
        message,
        room: 'general', // Phòng chat mặc định
      };
      socket.emit('chatMessage', data);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  return (
    <div className="message d-flex">
    <div className="col-md-4 border-right px-0 left_mess">  
    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
 <Title level={3} className="text-sm  text-center text-black font-semibold">
          Discussions
        </Title>
 </div>
        <DisscussionSection groupId={groupId} auth={auth} />
    </div>

    <div className="col-md-8 px-0">
        <RightSide />
    </div>
</div>
 
  
  
  );
}

export default Discussion;
