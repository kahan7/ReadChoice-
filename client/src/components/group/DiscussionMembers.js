import React, { useState } from 'react';
import { Button, Modal, List } from 'antd';
import UserCard from '../UserCard';



const DiscussionMembers = ({members}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button onClick={handleOpenModal} className='bg-purple hover:bg-faint-purple text-white ml-2 border-none'>Members</Button>

      <Modal
        title="Members List"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <List
          dataSource={members}
          renderItem={(user) => (
         
            <UserCard user={user} />             )}
        />
      </Modal>
    </>
  );
};

export default DiscussionMembers;
