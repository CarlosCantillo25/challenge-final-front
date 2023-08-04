import { createBrowserRouter } from "react-router-dom";
import Main from "../src/layouts/Main";
import App from "../src/App";
import ProductDetail from "../src/pages/ProductDetail";

const router = createBrowserRouter([
    {
    path:"/",
    element:<Main/>,
    children:[            
        {
            path:'/',
            element: <App/>
        },
        {
            path:'/ProductDetail',
            element: <ProductDetail/>
        },
    ]
}
])
export default router