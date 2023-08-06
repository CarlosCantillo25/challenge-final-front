import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
import ProductDetail from "../src/pages/ProductDetail";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/ProductDetail',
                element: <ProductDetail />
            },
        ]
    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: '/Login',
        element: <Login />
    }
])
export default router