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
} from "react-router-dom";
import "./app.scss";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.js";
import Footer from "./components/footer/Footer.jsx";
import Pay from "./pages/pay/Pay.jsx";
import EditProfile from "./pages/editProfile/EditProfile.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
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
