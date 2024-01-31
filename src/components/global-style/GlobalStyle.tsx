import './GlobalStyle.scss';

interface GlobalStyleProps {
  children: any;
}

function GlobalStyle({ children }: GlobalStyleProps): JSX.Element {
  return <>{children}</>;
}

export default GlobalStyle;
