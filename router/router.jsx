import { createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import {
    Main,
    ProductDetail,
    Register,
    Login
} from "./index.js";

import Index from "../src/pages/Index.jsx";

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
                path: '/ProductDetail',
                element: <ProductDetail />
            },
            {
                path: '/Register',
                element: (
                    <ProtectedRouter>
                        <Register />
                    </ProtectedRouter>
                )
            },
            {
                path: '/Login',
                element: (
                    <ProtectedRouter>
                        <Login />
                    </ProtectedRouter>
                )
            }
        ]
    }
])
export default router