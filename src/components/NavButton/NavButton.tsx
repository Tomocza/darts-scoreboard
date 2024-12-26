import NavButtonProps from './types';
import { Link } from 'react-router-dom';

export default function NavButton({ text, linkTo }: NavButtonProps) {
  return (
    <Link to={linkTo}>
      <button>{text}</button>
    </Link>
  );
}
