import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetails";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/edit/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/create",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
  },
]);

export default router;