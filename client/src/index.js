import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";
import Cookies from "js-cookie";
import Post from "./common/routes/post";


const AdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAdmin(false);
        return;
      }

      try {
        const resp = await Post("/verif", { token });
        if (resp.status !== 200) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error(error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return isAdmin ? <Admin /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminCheck />,
  },
  {
    path: "*",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();