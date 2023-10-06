import HeaderContacts from './headerContacts/HeaderContacts';
import HeaderMain from './headerMain/HeaderMain';
import Popup from '../popup/Popup';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <HeaderContacts />
      <HeaderMain />
      <Popup />
    </header>
  );
};

export default Header;
