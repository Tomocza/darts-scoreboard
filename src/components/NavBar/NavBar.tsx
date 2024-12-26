import NavButton from '../NavButton';
import NavBarProps from './types';

export default function NavBar({ buttons }: NavBarProps) {
  return (
    <div>
      {buttons.map((btnProps) => (
        <NavButton {...btnProps} />
      ))}
    </div>
  );
}
