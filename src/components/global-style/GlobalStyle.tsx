import '../../assets/font/font.css';
import './reset.css';
import './GlobalStyle.css';

interface GlobalStyleProps {
  children: any;
}

function GlobalStyle({ children }: GlobalStyleProps): JSX.Element {
  return <>{children}</>;
}

export default GlobalStyle;
