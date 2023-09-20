import Navbar from "./components/navbar/Navbar.jsx";
import SideBar from "./components/sideBar/SideBar.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./app.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext.js";
import Footer from "./components/footer/Footer.jsx";
import Pay from "./pages/pay/Pay.jsx";
import EditProfile from "./pages/editProfile/EditProfile.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { makeRequest } from "./axios.js";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [accessTokenExists, setAccessTokenExists] = useState(false);

    useEffect(() => {
      const fetchAccessToken = async () => {
        try {
          const response = await makeRequest.get("/auth/token");
          const { accessToken } = response.data;
          if (!accessToken) {
            navigate("/login");
          } else {
            setAccessTokenExists(true);
          }
        } catch (error) {
          console.error("Error fetching accessToken:", error);
        } finally {
          setIsLoading(false); // Set loading to false once you have fetched and checked the token
        }
      };

      fetchAccessToken();
    }, [navigate]);

    // Display loading indicator while checking for access token
    if (isLoading) {
      return <div></div>;
    }

    // If accessToken doesn't exist, you have already navigated to /login
    if (!accessTokenExists) {
      return null; // Render nothing if accessToken doesn't exist
    }

    return (
      <QueryClientProvider client={queryClient}>
        <div className="layout">
          <Navbar />
          <div style={{ display: "flex" }}>
            <SideBar />
            <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
              <div className="mainContainer">
                <Outlet />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
        {
          path: "/profile",
          element: <EditProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
