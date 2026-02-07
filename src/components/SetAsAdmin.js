import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const SetupAdmin = ({ userId, onSetAdmin }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log("User data:", data); // Log the data
          setUsers(data.users);
        } catch (error) {
          console.error('Error fetching users:', error);
          // Handle errors or display appropriate messages to the user
        }
      };
      

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSelectedUser = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSelectedUser(data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle errors or display appropriate messages to the user
      }
    };

    fetchSelectedUser();
  }, [userId]);

  const handleSetAdmin = async () => {
    try {
      // Assuming onSetAdmin is a function that makes the API call
      await onSetAdmin(userId);
      setShowModal(false);
      // Optionally, you can perform additional actions after successfully setting the user as an admin
    } catch (error) {
      console.error('Error setting user as admin:', error);
      // Handle error scenarios, e.g., show an error message to the user
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Set as Admin
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set User as Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to set this user as an admin?</p>
          {selectedUser && (
            <div>
              <h5>User Details:</h5>
              <p>User ID: {selectedUser._id}</p>
              <p>Username: {selectedUser.username}</p>
              {/* Add more user details as needed */}
            </div>
          )}
          {/* Display the list of users in a table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                {/* Add more columns if needed */}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    {/* Add more columns if needed */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No users found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSetAdmin}>
            Set as Admin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetupAdmin;
