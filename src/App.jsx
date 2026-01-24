import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";



const Layout = () => {
  return (
    <>
      main page
    </>
  );
}


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Oops!404 not found.</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
