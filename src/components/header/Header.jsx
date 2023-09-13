import HeaderContacts from './headerContacts/HeaderContacts';
import HeaderMain from './headerMain/HeaderMain';

import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <HeaderContacts />
      <HeaderMain />
    </div>
  );
};

export default Header;
