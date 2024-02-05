interface MainLayout {
  queueCard: {
    isHidden: boolean;
  };
}

interface MainLayoutPayload {}

interface MainLayoutAction {
  type: 'toggle_queue';
  payload: MainLayoutPayload;
}

const INITIAL_MAIN_LAYOUT: MainLayout = {
  queueCard: { isHidden: false },
};

function mainLayoutReducer(states: MainLayout, action: MainLayoutAction) {
  let queueCard = { ...states.queueCard };
  const { type } = action;

  switch (type) {
    case 'toggle_queue':
      queueCard.isHidden = !states.queueCard.isHidden;
      return { ...states, queueCard };
    default:
      break;
  }
  return states;
}

export { INITIAL_MAIN_LAYOUT };
export type { MainLayout, MainLayoutAction, MainLayoutPayload };
export default mainLayoutReducer;
