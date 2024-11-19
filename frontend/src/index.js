import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import {Provider} from 'react-redux';
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HelmetProvider} from 'react-helmet-async';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<HomeScreen />} />
      <Route path='/search/:keyword' index={true} element={<HomeScreen />} />
      <Route path='/product/:id' index={true} element={<ProductScreen />} />
      <Route path='/cart' index={true} element={<CartScreen />} />
      <Route path='/login' index={true} element={<LoginScreen />} />
      <Route path='/register' index={true} element={<RegisterScreen />} />
      

      <Route path='' element={<PrivateRoute/>} >
        <Route path='/shipping' index={true} element={<ShippingScreen />} />
        <Route path='/payment' index={true} element={<PaymentScreen />} />
        <Route path='/placeorder' index={true} element={<PlaceOrderScreen />} />
        <Route path='/order/:id' index={true} element={<OrderScreen />} />
        <Route path='/profile' index={true} element={<ProfileScreen />} />
      </Route>

      <Route path='' element={<AdminRoute/>} >
        <Route path='/admin/orderlist' index={true} element={<OrderListScreen />} />
        <Route path='/admin/productlist' index={true} element={<ProductListScreen />} />
        <Route path='/admin/product/:id/edit' index={true} element={<ProductEditScreen />} />
        <Route path='/admin/userlist' index={true} element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' index={true} element={<UserEditScreen />} />
        
      </Route>

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true} >
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);


reportWebVitals();
