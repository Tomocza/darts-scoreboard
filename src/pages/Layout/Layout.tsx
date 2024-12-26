import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import NavButtonProps from '../../components/NavButton/types';

export default function Layout() {
  const navButtons: NavButtonProps[] = [
    { text: 'Main', linkTo: '/' },
    { text: 'Options', linkTo: '/options' },
    { text: 'Game', linkTo: '/game' },
  ];

  return (
    <div>
      <NavBar buttons={navButtons} />
      <Outlet />
    </div>
  );
}
