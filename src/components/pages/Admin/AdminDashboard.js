// import React from 'react';
// import Logout from '../Logout'; // Ensure you have the correct path to the Logout component

// function AdminDashboard() {
//     return (
//         <div style={{ padding: '20px', backgroundColor: '#f4f4f8', minHeight: '100vh' }}>
//             <h1>Admin Dashboard</h1>
//             <Logout />
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//                 <div style={{ width: '30%', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
//                     <h2>User Management</h2>
//                     <p>Tools to add, remove, or modify users.</p>
//                 </div>
//                 <div style={{ width: '30%', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
//                     <h2>System Stats</h2>
//                     <p>View system usage and other statistics.</p>
//                 </div>
//                 <div style={{ width: '30%', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
//                     <h2>Reports</h2>
//                     <p>Generate reports for revenue, engagement, etc.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminDashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './UserManagement.css'; // Import CSS file for styling

// function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({ name: '', email: '' });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/user');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error.message);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAdd = async () => {
//     try {
//       await axios.post('http://localhost:8000/user', formData);
//       fetchUsers();
//       setFormData({ name: '', email: '' });
//     } catch (error) {
//       console.error('Error adding user:', error.message);
//     }
//   };

//   const handleEdit = async (id) => {
//     // Implement edit functionality
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/user/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error.message);
//     }
//   };

//   return (
//     <div className="user-management">
//       <h2>User Management</h2>
//       <div className="form-container">
//         <h3>Add User</h3>
//         <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <button onClick={handleAdd}>Add User</button>
//       </div>
//       <table className="custom-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css'; // Import CSS file for styling

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:8000/user', formData);
      fetchUsers();
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/user/${id}`);
      setEditingUser(response.data);
    } catch (error) {
      console.error('Error fetching user data for editing:', error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/user/${editingUser.id}`, editingUser);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="form-container">
        <h3>Add User</h3>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <button onClick={handleAdd}>Add User</button>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <input type="text" name="name" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
          <input type="email" name="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default UserManagement;


