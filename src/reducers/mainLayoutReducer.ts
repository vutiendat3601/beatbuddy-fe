import { getScreenWidth, screens } from '../shared/utils/responsive-util';

type FocusType = 'header' | 'queue' | 'content';

interface MainLayout {
  focused: FocusType;
}

interface MainLayoutPayload {
  targetFocus?: FocusType;
}

type MainLayoutActionType = 'change_focus';

interface MainLayoutAction {
  type: MainLayoutActionType;

  payload: MainLayoutPayload;
}

const INITIAL_MAIN_LAYOUT: MainLayout = {
  focused: 'content',
};

function mainLayoutReducer(states: MainLayout, action: MainLayoutAction) {
  const { type, payload } = action;
  switch (type) {
    case 'change_focus':
      if (payload.targetFocus) {
        states.focused = payload.targetFocus;
        return { ...states };
      }
      break;
    default:
      break;
  }
  return states;
}

function autoChangeFocus(
  dispatchMainLayout: (value: MainLayoutAction) => void,
  targetFocus: FocusType,
  breakpoint: number = screens.lg,
  isSmaller: boolean = true
) {
  const screenWidth = getScreenWidth();
  if (isSmaller) {
    screenWidth < breakpoint && changeFocus(dispatchMainLayout, targetFocus);
  } else {
    screenWidth >= breakpoint && changeFocus(dispatchMainLayout, targetFocus);
  }
}

function changeFocus(
  dispatchMainLayout: (value: MainLayoutAction) => void,
  targetFocus: FocusType
) {
  dispatchMainLayout({
    type: 'change_focus',
    payload: { targetFocus },
  });
}

export { INITIAL_MAIN_LAYOUT, autoChangeFocus, changeFocus };
export type { MainLayout, MainLayoutAction, MainLayoutPayload };
export default mainLayoutReducer;
