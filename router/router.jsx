import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import ProductDetail from "../src/pages/ProductDetail";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Index from "../src/pages/Index";
import Tv from "../src/pages/Tv";
import Phones from "../src/pages/Phones";
import Speakers from "../src/pages/Speakers";
import Air from "../src/pages/Air"
import Fridge from "../src/pages/Fridge";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Index />
            },
            {
                path: '/tv',
                element: <Tv />
            },
            {
                path: '/phones',
                element: <Phones />
            },
            {
                path: '/speakers',
                element: <Speakers />
            },
            {
                path: '/air',
                element: <Air />
            },
            {
                path: '/fridge',
                element: <Fridge />
            },
            {
                path: '/products/:id',
                element: <ProductDetail />
            },
            {
                path: '/Register',
                element: <Register />
            },
            {
                path: '/Login',
                element: <Login />
            }
        ]
    }
])
export default router