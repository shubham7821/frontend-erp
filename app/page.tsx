// 'use client';
// import Navigation from "./components/Navigation";

// import axios from "axios";

// export async function getServerSideProps({ context }: { context: any; }) {
//   const { req } = context;
//   let isLoggedIn = false;

//   try {
//     // Simulate fetching user authentication status from an API
//     const response = await axios.get("/api/check-auth", {
//       headers: {
//         Cookie: req.headers.cookie || "", // Forward cookies to the API server
//       },
//     });
//     isLoggedIn = response.data.isAuthenticated; // Assume API returns { isAuthenticated: true/false }
//   } catch (error) {
//     isLoggedIn = false; // Assume user is not logged in if there's an error
//   }

//   return {
//     props: {
//       isLoggedIn, // Pass this prop to your component
//     },
//   };
// }
// export default function Home({ isLoggedIn }: any) {
//   console.log("hi");
//   return (
//     <>
//       <Navigation />
//     </>
//   );
// }


// 'use client'

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navigation from "./components/Navigation";
// import axios from "axios";

// function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate(); // Hook for navigation

//   useEffect(() => {
//     async function fetchAuthStatus() {
//       try {
//         // Fetch user authentication status from an API
//         const response = await axios.get('/api/check-auth', {
//           withCredentials: true // Necessary for cookies to be included in the request
//         });
//         const isAuthenticated = response.data.isAuthenticated;
//         setIsLoggedIn(isAuthenticated);
        
//         // Redirect if not authenticated
//         if (!isAuthenticated) {
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error("Error fetching authentication status:", error);
//         navigate('/login'); // Navigate to login on error
//       }
//     }

//     fetchAuthStatus();
//   }, [navigate]); // Dependency array includes navigate to handle potential updates

//   return (
//     <>
//       <Navigation />
//       <div>User is {isLoggedIn ? 'logged in' : 'not logged in'}</div>
//     </>
//   );
// }

// export default Home;

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Navigation from './components/Navigation';
// import axios from 'axios';

// function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     let isMounted = true;  // Flag to handle cleanup of useEffect

//     async function fetchAuthStatus() {
//       try {
//         const response = await axios.get('/api/check-auth', {
//           withCredentials: true
//         });

//         if (isMounted) {  // Check if the component is still mounted
//           setIsLoggedIn(response.data.isAuthenticated);

//           if (!response.data.isAuthenticated) {
//             router.push('/login');
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching authentication status:", error);
//         if (isMounted) {
//           router.push('/login');
//         }
//       }
//     }

//     fetchAuthStatus();

//     // Cleanup function to set isMounted to false when the component unmounts
//     return () => {
//       isMounted = false;
//     };
//   }, [router]);  // Dependency on router

//   return (
//     <>
//       <Navigation />
//       <div>User is {isLoggedIn ? 'logged in' : 'not logged in'}</div>
//     </>
//   );
// }

// export default Home;

// 'use client'

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
// import Navigation from './components/Navigation';
// import axios from 'axios';

// async function fetchAuthStatus(cookies: string | undefined) {
//   try {
//     const response = await axios.get('/api/check-auth', {
//       headers: {
//         Cookie: cookies || "",
//       },
//       withCredentials: true, // Ensure cookies are sent with the request
//     });
//     return response.data.isAuthenticated;
//   } catch (error) {
//     console.error("Error fetching authentication status:", error);
//     return false;
//   }
// }

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function checkAuth() {
//       const isAuthenticated = await fetchAuthStatus(document.cookie);
//       setIsLoggedIn(isAuthenticated);

//       if (!isAuthenticated) {
//         router.push('login');
//       }
//     }

//     checkAuth();
//   }, [router]);

//   return (
//     <>
//       <Navigation />
//       <div>User is {isLoggedIn ? 'logged in' : 'not logged in'}</div>
//     </>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure correct import from 'next/navigation'
import Navigation from './components/Navigation';
import axios from 'axios';

// Function to fetch authentication status
async function fetchAuthStatus(cookies: string | undefined) {
  try {
    const response = await axios.get('/api/check-auth', {
      headers: {
        Cookie: cookies || "",
      },
      withCredentials: true, // Ensure cookies are sent with the request
    });
    return response.data.isAuthenticated;
  } catch (error) {
    console.error("Error fetching authentication status:", error);
    return false;
  }
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await fetchAuthStatus(document.cookie);
      setIsLoggedIn(isAuthenticated);

      if (!isAuthenticated) {
        router.push('/user/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoggedIn === null) {
    // Optionally, you can show a loading indicator while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div>User is {isLoggedIn ? 'logged in' : 'not logged in'}</div>
    </>
  );
}
