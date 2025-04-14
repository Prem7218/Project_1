import React, { lazy } from "react";
import { Header } from "./component/header/Header";
import Body from "./component/body/Body";
import Footer from "./component/footer/Footer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Form,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ContactUs from "./component/body/ContactUs";
import About from "./component/body/About";
import Error from "./component/body/Error";
import ResMenu from "./component/body/Restaurant/ResMenu";
import { FuncDemo } from "./component/Demo/FuncDemo";
import { Form } from "./component/Demo/ClassDemo";
import { CartProvider } from "./component/Context/CartContext";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore";
import Cart from "./component/Cart";
// import Grocery from "./component/Demo/Grocery";

const Grocery = lazy(() => import("./component/Demo/Grocery"));

const AppLayout = () => {
  return (
    <div>
      <Provider store={appStore}>
        <CartProvider>
          <Header
            headName={"Heading from Parent App!"}
            headName1={"Heading 2"}
          />
          <Outlet />
          <Footer />
        </CartProvider>
      </Provider>
    </div>
  );
};

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Body />
//       },
//       {
//           path: "/about",
//           element: <About />
//       },
//       {
//           path: "/contact",
//           element: <ContactUs />
//       }
//     ],
//     errorElement: <Error />
//   }
// ]);

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<Error />}>
      <Route element={<Body />} index />
      <Route element={<About />} path="/about" />
      <Route element={<Cart />} path="/cart" />
      <Route element={<ContactUs />} path="/contact" />
      <Route element={<ResMenu />} path="/res-menu/:resid" />
      <Route element={<FuncDemo />} path="/func" />
      <Route element={<Form />} path="/classdemo" />
      <Route element={<Grocery />} path={"/grocery"} />
    </Route>
  )
);

export const App = () => <RouterProvider router={appRouter} />;
