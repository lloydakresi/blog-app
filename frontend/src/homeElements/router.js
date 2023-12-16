import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import ErrorPage from "./error-page";
import LoginForm from "../components/sessionComponents/login";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children:[
        {
          path: 'login',
          element: <LoginForm />,
        },

      ]
    },

]);

export default router;
