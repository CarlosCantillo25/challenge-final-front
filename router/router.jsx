import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import ProductDetail from "../src/pages/ProductDetail";
import Index from "../src/pages/Index";

const router = createBrowserRouter([
    {
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