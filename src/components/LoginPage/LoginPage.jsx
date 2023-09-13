import { Link } from 'react-router-dom';
import Login from '../login/Login';
import './loginPage.scss';

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page__inner">
        <h1 className="login-page__title">Login</h1>
        <Login />
        <p className="login-page__paragraph">
          Or <Link to="/register">register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
