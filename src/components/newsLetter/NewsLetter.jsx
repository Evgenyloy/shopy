import React from 'react';
import './newsLetter.scss';
import { IoIosMail } from 'react-icons/io';

function NewsLetter() {
  return (
    <div className="news-letter">
      <div className="news-letter__inner">
        <h2 className="news-letter__title">news letter</h2>
        <p className="news-letter__text">
          join us now to get all news and special offers
        </p>

        <form className="news-letter__form" action="POST">
          <IoIosMail className="news-letter__svg" />
          <input
            className="news-letter__input"
            type="text"
            placeholder="type your email here"
            name="mail"
          />
          <button className="news-letter__button" type="submit">
            join us
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
