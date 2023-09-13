import Logo from '../../logo/Logo';
import HeaderNav from './headerNav/HeaderNav';
import HeaderTools from './headerTools/HeaderTools';
import './headerMain.scss';

const HeaderMain = () => {
  return (
    <div className="headerMain">
      <div className="container">
        <div className="headerMain__inner">
          <Logo />
          <HeaderNav />
          <HeaderTools />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
