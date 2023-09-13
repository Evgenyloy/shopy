import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../signUp/SignUp';
import './registerPage.scss';

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-page__inner">
        <h2 className="register-page__title">Register</h2>
        <SignUp />
        <p className="register-page__paragraph">
          <span>Already have an account?</span> <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
