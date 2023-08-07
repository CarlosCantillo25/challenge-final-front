import { createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import {
    Main,
    ProductDetail,
    Register,
    Login,
    Tv,
    Phones,
    Speakers,
    Air,
    Fridge,
} from "./index.js";

import Index from "../src/pages/Index.jsx";
import VerifyAccount from "../src/pages/VerifyAccount";

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
                path: '/TV',
                element: <Tv />
            },
            {
                path: '/Phones',
                element: <Phones />
            },
            {
                path: '/SPEAKERS',
                element: <Speakers />
            },
            {
                path: '/Air',
                element: <Air />
            },
            {
                path: '/Fridge',
                element: <Fridge />
            },
            {
                path: '/products/:id',
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
            },
            {
                path: '/verifyAccount',
                element: (
                    <ProtectedRouter>
                        <VerifyAccount />
                    </ProtectedRouter>
                )
            },
        ]
    }
])
export default router