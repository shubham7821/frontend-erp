// import React from 'react';
// import { useRouter } from 'next/router';

// function Logout() {
//     const router = useRouter();

//     const handleLogout = (e) => {
//         e.preventDefault(); // Prevent default link behavior
//         localStorage.removeItem('token'); // Remove the token
//         router.push('/login'); // Redirect to login page
//     };

//     // Looks like a link, but acts like a button
//     return (
//         <a href="/login" onClick={handleLogout} style={{
//             padding: '10px 20px',
//             backgroundColor: 'transparent',
//             color: 'blue',
//             textDecoration: 'underline',
//             cursor: 'pointer'
//         }}>
//             Logout
//         </a>
//     );
// }

// export default Logout;
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove the token
        setIsLoggedOut(true);  // Set the logged-out flag
    };

    if (isLoggedOut) {
        // Use window.location to redirect after logout
        window.location.href = '/login';
        return null;
    }

    return (
        <button onClick={handleLogout} style={{
            background: 'none',
            color: 'blue',
            border: 'none',
            padding: 0,
            textDecoration: 'underline',
            cursor: 'pointer'
        }}>
            Logout
        </button>
    );
}

export default Logout;
