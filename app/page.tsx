import Navigation from "@app/components/Navigation";

import axios from "axios";

export async function getServerSideProps(context: any) {
  const { req } = context;
  let isLoggedIn = false;

  try {
    // Simulate fetching user authentication status from an API
    const response = await axios.get("http://your-backend-url/api/check-auth", {
      headers: {
        Cookie: req.headers.cookie || "", // Forward cookies to the API server
      },
    });
    isLoggedIn = response.data.isAuthenticated; // Assume API returns { isAuthenticated: true/false }
  } catch (error) {
    isLoggedIn = false; // Assume user is not logged in if there's an error
  }

  return {
    props: {
      isLoggedIn, // Pass this prop to your component
    },
  };
}
export default function Home({ isLoggedIn }: any) {
  console.log("hi");
  return (
    <>
      <Navigation />
    </>
  );
}
