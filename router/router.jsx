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
   Headphones,
   Notebooks,
   Microphones,
   Cameras
} from "./index.js";
import Tabs from "../src/pages/Tabs";
import Desktops from "../src/pages/Desktops";
import Chairs from "../src/pages/Chairs";
import Pc from "../src/pages/Pc";
import Mouses from "../src/pages/Mouses";
import Index from "../src/pages/Index.jsx";
import Kitchens from "../src/pages/Kitchens.jsx"
import Blenders from "../src/pages/Blenders.jsx"
import Laundrys from "../src/pages/Laundrys.jsx"
import VerifyAccount from "../src/pages/VerifyAccount";
import ResultProducts from "../src/pages/ResultProducts";
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
                element: <Fridge/>
            },
            {
                path: '/Headphones',
                element: <Headphones/>
            },
            {
                path: '/Notebooks',
                element: <Notebooks/>
            },
            {
                path: '/Microphones',
                element: <Microphones/>
            },
            {
                path: '/Cameras',
                element: <Cameras/>
            },
            {
                path: '/Tabs',
                element: <Tabs/>
            },
            {
                path: '/Desktops',
                element: <Desktops/>
            },
            {
                path: '/Chairs',
                element: <Chairs/>
            },
            {
                path: '/Pc',
                element: <Pc/>
            },
            {
                path: '/Mouses',
                element: <Mouses/>
            },
            {
                path: '/Laundrys',
                element: <Laundrys/>
            },
            {
                path: '/Kitchens',
                element: <Kitchens/>
            },
            {
                path: '/Blenders',
                element: <Blenders/>
            },
            {
                path: '/ResultProducts',
                element:  <ResultProducts/>
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
                element:<VerifyAccount />
            },
        ]
    }
])
export default router