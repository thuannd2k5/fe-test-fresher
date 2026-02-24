import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/home";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/loading";
import NotFound from "./components/notFound";
import AdminPage from "./pages/admin";
import ProtectedRoutes from "./components/protectedRoutes";
import LayoutAdmin from "./components/admin/layoutAdmin";
import UserTable from "./pages/user/userTable";
import BookPage from "./pages/book/bookPage";



const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}


export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)


  const getAccount = async () => {
    if (
      window.location.pathname === "/login"
      || window.location.pathname === "/register"
    ) return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "user",
          element: <UserTable />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoutes>
              <AdminPage />
            </ProtectedRoutes>
        },
        {
          path: "user",
          element:
            <ProtectedRoutes>
              <UserTable />
            </ProtectedRoutes>,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isLoading === false
        || window.location.pathname === "/login"
        || window.location.pathname === "/register"
        || window.location.pathname === "/"
        ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
    </>
  )
}
