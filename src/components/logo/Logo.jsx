import logo from '../../resources/img/layers.png';
import { Link } from 'react-router-dom';
import './logo.scss';
const Logo = () => {
  return (
    <div className="logo">
      <div className="logo__inner">
        <span className="logo__text">SH</span>
        <img src={logo} alt="logo" className="logo__img" />
        <span className="logo__text">PY</span>
      </div>
      <h3 className="logo__title">shope anywhere</h3>
      <Link className="logo__link" to="/"></Link>
    </div>
  );
};

export default Logo;
