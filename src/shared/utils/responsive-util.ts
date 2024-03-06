type Screen = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const screens = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};
function getScreenWidth(): number {
  return window.innerWidth;
}

export type { Screen };
export { screens, getScreenWidth };
