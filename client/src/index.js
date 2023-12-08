// Import necessary dependencies from React and React DOM
import * as React from "react";
import * as ReactDOM from "react-dom/client";

// Import dependencies from React Router and Axios
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import AuthProvider and useAuth
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import global CSS styles
import "./index.css";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Main from "./pages/Main";

// Component to handle routes and authentication
const RouteWrapper = ({ element }) => {
  const { setAuthentication, getIsAuthenticated } = useAuth();

  // State to track the authentication status
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make an API call to check if the user is authenticated
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/isauthenticated`, { withCredentials: true });

        // Update authentication status in both local state and the context
        setAuthentication(response.data.isAuthenticated);
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated === null) {
      checkAuthentication();
    }
  }, [isAuthenticated, setAuthentication]);

  // Render different components based on authentication status
  return isAuthenticated === null ? null : isAuthenticated ? <Main /> : <Home />;
};

// Create routes using React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteWrapper element={<Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>} />,
  },
]);

// Render the entire application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
