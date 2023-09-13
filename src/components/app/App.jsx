import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../header/Header';
import Products from '../products/Products';
import Footer from '../footer/Footer';
import Favorites from '../favorites/Favorites';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../registerPage/RegisterPage';
import Basket from '../basket/Basket';
import '../../style/style.scss';
import './app.scss';
import { useAuth } from '../../hooks/use-auth';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

function App() {
  /*   const a = fetch('https://6yps3h-8080.csb.app/posts')
    .then((response) => response.json())
    .then((json) => console.log(json));
 */
  const { orders, favorites, email, isAuth } = useAuth();
  useEffect(() => {
    if (!isAuth) return;
    updateUserOrder();
  }, [orders, favorites]);

  const updateUserOrder = async () => {
    /* if (!isAuth) return; */

    const db = getFirestore();
    const userRef = doc(db, 'users', `${email}`);
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
          <Route exact path="/">
            <Products />
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
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
