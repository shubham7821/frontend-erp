import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from '@formio/react';

const UserPage = () => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        // Make an API call to fetch user ID from the login endpoint
        const response = await axios.post('https://localhost:3003/auth/login', {
          // Add login credentials if required
        });
        setUserId(response.data.userId); // Assuming the user ID is returned in the response
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return; // Do nothing if user ID is not available

    const fetchUserData = async () => {
      try {
        // Make an API call to fetch user data based on user ID
        const response = await axios.get(`https://localhost:3003/users/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>User page</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {userId}</p>
      <Form form={{ display: 'form', components: userData }} />
    </div>
  );
};

export default UserPage;
