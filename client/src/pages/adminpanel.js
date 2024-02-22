import React, { useState, useEffect } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { UserOutlined, FileOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { URL } from '../utils/Url';

const { Sider, Content } = Layout;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const [reports, setReports] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${URL}/api/users`);
      const response2 = await fetch(`${URL}/api/reports`);
      const data = await response.json();
      const data2 = await response2.json();
      console.log(data2)
      setReports(data2)
      setUsers(data);
 
    };
    fetchUsers();
  }, []);
  const handleReviewClick = (reviewId) => {
    // Find the review object that matches the given review ID
const review = reviewId;
    // Set the selected review state to the review object
    setSelectedReview(review);

    // Set the modal visible state to true
    setModalVisible(true);
  };

  const handleDeleteReview = () => {
    // TODO: Implement delete review logic
    console.log('Deleting review...');
  };

  const handleUpdateUserStatus = (userId,value, i) => {
 
    
const updatedUser = { ...users[i], status:value == "enable"?  "active": "disabled" };
    const updatedUsers = [...users.slice(0, i), updatedUser, ...users.slice(i + 1)];
setUsers(updatedUsers)
    axios.put(`${URL}/api/users/${userId}/${value}`)
      .then(response => {
    })
      .catch(error => {
     });
  };
  const handleMenuItemClick = (event) => {
    setSelectedMenuItem(event.key);
  };
  const renderContent = () => {
    if (selectedMenuItem === '1') {
      return (
        <>
     
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Edit</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users &&
              users.map((user,index) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-4">{user._id}</td>
                  <td className="py-3 px-4">{user.fullname}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.status}</td>
                  <td className="py-3 px-4">
                  <button onClick={(e) => handleUpdateUserStatus(user._id,user && user.status == "disabled" ? "enable" : "disable", index)} >

                     
                  {user &&user && user.status != "active" ? "enable" : "disable"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </>  );
    } else if (selectedMenuItem === '2') {
      return (   <>  <Modal
        title="Review Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" onClick={handleDeleteReview}>
            Delete Review
          </Button>,
        ]}
      >
        {selectedReview && (
          <>
            <p><b>Reviewer:</b> {selectedReview.author.fullname}</p>
            <p><b>Review Content:</b> {selectedReview.content}</p>
            <p><b>The reviewed book:</b> {selectedReview.book.title}</p>
          </>
        )}
      </Modal>   <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-4 text-left">ID</th>
          <th className="py-3 px-4 text-left">Review Id</th>
          <th className="py-3 px-4 text-left">Reported By</th>
          <th className="py-3 px-4 text-left">Reason</th>
          <th className="py-3 px-4 text-left">Reported At</th>
        
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {reports && reports.map((report,index) => (
            <tr key={report._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{report._id}</td>
              <td
                  className="py-3 px-4 cursor-pointer text-blue-500"
                  onClick={() => handleReviewClick(report.reviewId)}
                >
                  { report.reviewId&& report.reviewId._id}
                </td>
              <td className="py-3 px-4">{report.userId.fullname}</td>
              <td className="py-3 px-4">{report.content}</td>
              <td className="py-3 px-4">{report.reportDate}</td>
              
          
            </tr>
          ))}
      </tbody>
    </table></> );
    }
  };
  return (
    <div className=" w-full h-full">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu theme="dark" selectedKeys={[selectedMenuItem]} onClick={handleMenuItemClick}  mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              Quản lý người dùng
            </Menu.Item>
            <Menu.Item key="2" icon={<FileOutlined />}>
              Xem báo cáo từ người dùng
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content>
          <Content>{renderContent()}</Content>

          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminPanel;
