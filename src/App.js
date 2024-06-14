import './App.css';
import React, { useEffect, useState } from 'react';

function getRandomValue(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function Header() {
  return <h1>즐거운 메뉴선정</h1>
}

function Check({ value, onClick }) {
  return (
    <input type="button" onClick={() => onClick(value)} value={value}></input>
  );
}

function Article({ menu, menus }) {
  let displayedMenu = '';

  if (menu in menus) {
    displayedMenu = getRandomValue(menus[menu]);
  } else {
    displayedMenu = '메뉴를 선택하세요';
  }

  return <article>{displayedMenu}</article>;
}

function App() {
  const menuList = ['한식', '중식', '일식', '양식', '베트남'];
  const [selectedMenu, setSelectedMenu] = useState('');
  const [menus, setMenus] = useState({});

  useEffect(() => {
    fetch('/menuData.txt')
      .then(response => response.text())
      .then(text => {
        const lines = text.split('\n');
        const result = {};
        let currentCategory = null;

        lines.forEach(line => {
          line = line.trim();
          if (line.endsWith(':')) {
            currentCategory = line.slice(0, -1);
            result[currentCategory] = [];
          } else if (currentCategory && line.length > 0) {
            result[currentCategory].push(line);
          }
        });

        setMenus(result);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className="App">
        <Header />
        {menuList.map((menu, index) => (
          <Check key={index} value={menu} onClick={handleMenuClick} />
        ))}
      </div>
      <div className='App'>
        <Article menu={selectedMenu} menus={menus} />
      </div>
    </>
  );
}

export default App;
