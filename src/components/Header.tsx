import { ReactNode, useEffect, useState } from 'react';

import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';

const Header = () => {
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const storageTheme = localStorage.getItem('theme');

    if (storageTheme) {
      if (JSON.parse(storageTheme) === 'light') {
        document.getElementById('body')?.setAttribute('theme', 'light');
        setTheme(true);
      } else {
        document.getElementById('body')?.setAttribute('theme', 'dark');
        setTheme(false);
      }
    }
  }, []);

  const handleDark = () => {
    document.getElementById('body')?.setAttribute('theme', theme ? 'dark' : 'light');
    setTheme(!theme);
    if (!theme) {
      localStorage.setItem('theme', JSON.stringify('light'));
    } else {
      localStorage.setItem('theme', JSON.stringify('dark'));
    }
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
