import './App.css';
import Navigation from './components/Navigation';
import AuthorSrc from './assets/symbol.png';
import { useState, useEffect } from 'react';
import SideMenu from './components/SideMenu';
import MainOverview from './components/main/MainOverview';

function App() {
  const [mainNavigation, setMainNavigation] = useState(null);
  const [sideNavigation, setSideNavigation] = useState(null);
  const [username, setUsername] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [mounted, setMounted] = useState(false);

  console.log(userAuth);

  useEffect(() => {
    const user = localStorage.getItem('userAuth');
    const init = JSON.parse(user);
    setUserAuth(init || false);
    setMounted(true);
  }, []);

  useEffect(() => {
    let getUser = () => {
      if (mounted) localStorage.setItem('userAuth', JSON.stringify(userAuth));
      if (userAuth) setUsername(localStorage.getItem('username'));
    };

    getUser();

    return () => setMounted(false);
  }, [userAuth, mounted]);

  return (
    <div className="w-screen h-screen bg-gray-200 justify-center flex items-center">
      <Navigation setter={setMainNavigation} />
      <SideMenu
        navValue={mainNavigation}
        setter={setSideNavigation}
        updateAuth={setUserAuth}
        user={userAuth}
      />
      <MainOverview
        user={userAuth}
        auth={setUserAuth}
        control={{ main: mainNavigation, sub: sideNavigation }}
      />
      <img
        src={AuthorSrc}
        alt=""
        className=" fixed -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] "
      />
    </div>
  );
}

export default App;
