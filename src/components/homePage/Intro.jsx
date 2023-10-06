import React from 'react';
import intoImg from '../../resources/img/main_img.jpg';
import './intro.scss';

function Intro() {
  return (
    <div className="intro">
      <div className="container">
        <div className="intro__text-block">
          <h1 className="intro__title">Hello autumn</h1>
          <h2 className="intro__sub-title">
            Give your wardrobe an upgrade with the Style Edit
          </h2>
          <p className="intro__text">For the whole family!</p>
        </div>
      </div>
      <div className="intro__img-cont">
        <img className="intro__img" src={intoImg} alt="intro-image" />
      </div>
    </div>
  );
}

//From everyday essentials to on-trend looks, we’ve got it.
// The online fashion outlet
//Today—and every day—we’re leading with purpose, championing
// inclusivity and creating a sense of belonging.
export default Intro;
