import React, { useState } from 'react';
import './form.scss';

function Form({ title, handleClick }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="form">
      <input
        className="form__input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        autoFocus
      />
      <input
        className="form__input"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button className="form__button" onClick={() => handleClick(email, pass)}>
        {title}
      </button>
    </div>
  );
}

export default Form;
