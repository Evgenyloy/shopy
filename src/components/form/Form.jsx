import { useState } from 'react';
import { useSelector } from 'react-redux';
import './form.scss';

function Form({ title, handleClick }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { emailError, passError } = useSelector((state) => state.formError);

  const handleEnterKeyDown = (e, email, pass) => {
    if (!email || !pass) return;
    if (e.key === 'Enter') {
      handleClick(email, pass);
    }
  };

  return (
    <div className="form">
      <div className="form__input-inner1">
        <input
          className="form__input form__input-1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          autoFocus
          onKeyUp={(e) => handleEnterKeyDown(e, email, pass)}
        />
        {emailError && <p className="form__input-error1">{emailError}</p>}
      </div>

      <div className="form__input-inner2">
        <input
          className="form__input form__input-2"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
          onKeyUp={(e) => handleEnterKeyDown(e, email, pass)}
        />
        {passError && <p className="form__input-error2">{passError}</p>}
      </div>

      <button
        type="button"
        className="form__button"
        onClick={() => handleClick(email, pass)}
      >
        {title}
      </button>
    </div>
  );
}

export default Form;
