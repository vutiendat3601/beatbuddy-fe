import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import classNames from 'classnames/bind';
import { clearUserData } from '../../shared/utils/auth-util';
import style from './UserDetail.module.scss';

const css = classNames.bind(style);

function UserDetail() {
  const { logout } = useOidc();
  const { oidcUser } = useOidcUser();
  return (
    <section className={css('user-detail')}>
      <header className={css('head')}>
        <div className={css('base')}>
          <img className={css('avatar')} src={oidcUser?.picture} alt="" />

          <div className="info">
            <h1 className="heading-1">{oidcUser?.name}</h1>
            <span>100 tracks listened this month.</span>
          </div>
        </div>
        <button
          className={`btn ${css('sign-out-btn')}`}
          onClick={() => {
            clearUserData();
            logout('/');
          }}
        >
          Sign out
        </button>
      </header>
    </section>
  );
}

export default UserDetail;
