import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useGetProductsQuery } from '../api/apiSlice';

import Header from '../header/Header';
import Products from '../products/Products';
import Footer from '../footer/Footer';
import Favorites from '../favorites/Favorites';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../registerPage/RegisterPage';
import Basket from '../basket/Basket';
import HomePage from '../homePage/HomePage';
import Product from '../product/Product';
import Checkout from '../checkout/Checkout';
import Page404 from '../page404/Page404';
import About from '../about/About';

import { useAuth } from '../../hooks/use-auth';
import '../../style/style.scss';
import './app.scss';

function App() {
  /* const a = fetch('https://6yps3h-8080.csb.app/posts')
    .then((response) => response.json())
    .then((json) => console.log(json));
 */
  //--------------------------------------------------------

  const { orders, favorites, user, isAuth } = useAuth();

  const {
    data: products = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetProductsQuery();

  useEffect(() => {
    if (isAuth) {
      updateUserInformation(user);
      localStorage.setItem('userData', JSON.stringify({ orders, favorites }));
    }
    if (!isAuth) {
      localStorage.setItem('guestData', JSON.stringify({ orders, favorites }));
    }
  }, [orders, favorites]);

  const updateUserInformation = async (user) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', `${user.email}`);
    await updateDoc(userRef, {
      orders,
      favorites,
    });
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/products">
            <Products
              products={products}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
            />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/basket">
            <Basket />
          </Route>
          <Route exact path="/">
            <HomePage
              products={products}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
            />
          </Route>
          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
