import classNames from 'classnames/bind';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

interface ButtonProps {
  disabled?: boolean;
  link?: string;
  children?: any;
}

const css = classNames.bind(styles);
function Button({
  disabled = false,
  link,
  children,
}: ButtonProps): JSX.Element {
  const classes = css('btn', { disabled });
  let comp: JSX.Element = <button className={classes}>{children}</button>;

  // ## Contain link
  if (link) {
    comp = (
      <Link className={classes} to={link}>
        {children}
      </Link>
    );
  }
  return comp;
}

export default Button;
