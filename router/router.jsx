import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import ProductDetail from "../src/pages/ProductDetail";
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import Index from "../src/pages/Index";

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
    path:"/",
    element:<Main/>,
    children:[            
        {
            path:'/',
            element: <Index/>
        },
        {
            path:'/ProductDetail',
            element: <ProductDetail/>
        },
    ]
}
])
export default router