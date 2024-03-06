import classNames from 'classnames/bind';
import style from './CtaNotification.module.scss';

const css = classNames.bind(style);

interface CtaNotificationProps {
  message: string;
  action?: () => void;
  actionName?: string;
}

function CtaNotification({
  message,
  action,
  actionName,
}: CtaNotificationProps): JSX.Element {
  return (
    <div className={`${css('cta-notification')}`}>
      <p className="text-label">{message}</p>
      {action && (
        <button className="btn" onClick={() => action()}>
          {actionName}
        </button>
      )}
    </div>
  );
}

export default CtaNotification;
