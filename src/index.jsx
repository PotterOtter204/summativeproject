import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AuthComponent from "./AuthComponent";
import Home from "./Home";
import Services from "./Services";
import About from "./About";
import React, { useState, useEffect } from "react";
import "./HoverComponent.css"; // import your CSS file
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "@firebase/auth";
// Step 1: Create a Protected Route Component
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out, redirect to sign-in page
        navigate("/signin");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Render children if user is authenticated
  return user ? children : null;
}

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Services",
    element: <Services />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: <AuthComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
