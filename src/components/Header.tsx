import { ReactNode, useState } from 'react';

import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';

const Header = () => {
  const [theme, setTheme] = useState(true);

  const handleDark = () => {
    document.getElementById('body')?.setAttribute('theme', theme ? 'dark' : 'light');
    setTheme(!theme);
  };
  return (
    <header className={theme ? '' : 'dark'}>
      <div className="header-content">
        <h1>TODO</h1>
        <button type="button" onClick={handleDark}>
          <img src={theme ? moonIcon : sunIcon} alt="Toggle dark mode" />
        </button>
      </div>
      <div className="bg-gradient" />
    </header>
  );
};

export default Header;
