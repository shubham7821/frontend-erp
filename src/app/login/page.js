"use client"
// import React, { useState } from 'react';
// import { Form } from '@formio/react';
// import axios from 'axios';
// import AdminPage from '@/components/pages/Admin/AdminPage';
// import UserPage from '@/components/pages/User/UserPage';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';

// function Login() {
//   const [result, setResult] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [error, setError] = useState('');


  
//   // Define form structure dynamically based on registration or login
//   const formStructure = {
//     title: isRegistering ? 'Registration Form' : 'Login Form',
//     display: 'form',
    
//     components: [
//       {
//         label: 'Username',
//         key: 'username',
//         type: 'textfield',
//         input: true,
//         required: !isRegistering,
//       },
//       {
//         label: 'Email',
//         key: 'email',
//         type: 'email',
//         input: true,
//         required: isRegistering,
//       },
//       {
//         label: 'Password',
//         key: 'password',
//         type: 'password',
//         input: true,
//         required: true,
//       },
//       ...isRegistering ? [
//         {
//           label: 'Role',
//           key: 'role',
//           type: 'select',
//           input: true,
//           dataSrc: 'values',
//           data: {
//             values: [
//               { label: 'Admin', value: 'admin' },
//               { label: 'User', value: 'user' }
//             ],
//           },
//           required: true,
//         }
//       ] : [],
//       {
//         label: isRegistering ? 'Register' : 'Login',
//         key: 'submit',
//         type: 'button',
//         action: 'submit',
//       },
//     ],
//   };

//   const onSubmitHandler = async (submission) => {
//     const apiUrl = isRegistering ? 'http://localhost:8000/user/signup' : 'http://localhost:8000/auth/login';
  
//     // Prepare the payload by destructuring only the needed fields from submission.data
//     const { email, username, password, role } = submission.data;
//     const payload = {
//       email,
//       username,
//       password,
//       ...(isRegistering && { role }) // Include role only if registering
//     };
  
//     try {
//       const response = await axios.post(apiUrl, payload);
//       console.log(`${isRegistering ? 'Registration' : 'Login'} successful:`, response.data);
//       setResult(response.data);
//       setSubmitted(true);
      
//       // Redirect based on role after login, only if not registering
//       if (!isRegistering) {
//         switch (response.data.role) {
//           case 'admin':
//             window.location.href = '/admin';
//             break;
//           case 'user':
//             window.location.href = '/user';
//             break;
//           default:
//             throw new Error('Unknown role received');
//         }
//       }
//     } catch (error) {
//       console.error(`${isRegistering ? 'Registration' : 'Login'} failed:`, error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || 'An error occurred');
//       setSubmitted(false);
//     }
//   };
  

//   // const handleLogout = async () => {
//   //   const navigate = useNavigate(); // Initialize the navigate function
  
//   //   try {
//   //     await axios.get('http://localhost:8000/auth/logout');
//   //     navigate('/login'); // Redirect to the login page using navigate
//   //   } catch (error) {
//   //     console.error('Logout failed:', error.message);
//   //     setError('Logout failed');
//   //   }
//   // };

//   return (
//     <div className="App">
//       <h2>{formStructure.title}</h2>
//       {error && <div className="alert alert-danger" role="alert">{error}</div>}
//       {!submitted ? (
//         <>
//           <Form form={formStructure} onSubmit={onSubmitHandler} />
//           <p>
//             {isRegistering ? 'Already have an account? ' : 'Don’t have an account? '}
//             <button onClick={() => setIsRegistering(!isRegistering)}>
//               {isRegistering ? 'Login' : 'Register'}
//             </button>
//           </p>
//         </>
//       ) : (
//         <>
//           <div className="card">
//             <div className="card-body">
//               <h4 className="bg-success text-white">Thank you!</h4>
//               <h5>{result?.username}</h5>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           </div>
//           {result?.role === 'admin' ? <AdminPage /> : <UserPage />}
//         </>
//       )}
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { Form } from '@formio/react';
import axios from 'axios';
import './App.css';
// import AdminPage from '@/components/pages/Admin/AdminDashboard';
// import UserPage from '@/components/pages/User/UserDashboard';
import AdminDashboard from '@/components/pages/Admin/AdminDashboard';
import UserDashboard from '@/components/pages/User/UserDashboard';

function Login() {
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  const registrationForm = {
    title: 'Registration Form',
    display: 'form',
    components: [
      {
        label: 'Username',
        key: 'username',
        type: 'textfield',
        input: true,
        required: true,
      },
      {
        label: 'Email',
        key: 'email',
        type: 'email',
        input: true,
        required: true,
      },
      {
        label: 'Password',
        key: 'password',
        type: 'password',
        input: true,
        required: true,
      },
      {
        label: 'Role',
        key: 'role',
        type: 'select',
        input: true,
        dataSrc: 'values',
        data: {
          values: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' }
          ],
        },
        required: true,
      },
      {
        label: 'Register',
        key: 'submit',
        type: 'button',
        action: 'submit',
      },
    ],
  };

  const loginForm = {
    title: 'Login Form',
    display: 'form',
    components: [
      {
        label: 'Email',
        key: 'email',
        type: 'email',
        input: true,
        required: true,
      },
      {
        label: 'Password',
        key: 'password',
        type: 'password',
        input: true,
        required: true,
      },
      {
        label: 'Login',
        key: 'submit',
        type: 'button',
        action: 'submit',
      },
    ],
  };

  const form = isRegistering ? registrationForm : loginForm;

  const onSubmitHandler = async (submission) => {
    const apiUrl = isRegistering ? 'http://localhost:8000/user/signup' : 'http://localhost:8000/auth/login';
    const { email, username, password, role } = submission.data;
    const payload = {
      email,
      password,
      ...(isRegistering && { username, role })
    };

    try {
      const response = await axios.post(apiUrl, payload);
      localStorage.setItem('token', response.data.token);  // Save token for later use
      setResult(response.data);
      setSubmitted(true);

      if (!isRegistering) {
        fetchUserProfile();  // Fetch profile data after login
      }
    } catch (error) {
      console.error(`${isRegistering ? 'Registration' : 'Login'} failed:`, error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'An error occurred');
      setSubmitted(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.error('Failed to fetch user profile:', error.message);
      setError('Failed to fetch user profile');
    }
  };

  return (
    <div className="App">
      <h2>{form.title}</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!submitted ? (
        <>
          <Form form={form} onSubmit={onSubmitHandler} />
          <p>
            {isRegistering ? 'Already have an account? ' : 'Don’t have an account? '}
            <button onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-body">
              <h4 className="bg-success text-white">Thank you!</h4>
              <h5>{result?.username}</h5>
              {userRole === 'admin' ? <AdminDashboard /> : <UserDashboard />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
