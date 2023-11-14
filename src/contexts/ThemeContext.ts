import { createContext } from 'react';
import { deviceWidth } from '../utils/responsive-device';

type SidebarStatus = 'hidden' | 'collapsed' | 'extended';

interface Sidebar {
  status: SidebarStatus;
  bordered: boolean;
}

interface Header {
  bordered: boolean;
}
interface ThemeContextProps {
  sidebar: Sidebar;
  setSidebar?: (value: Sidebar) => void;
  header: Header;
  setHeader?: (value: Header) => void;
}

const defaultThemeContext: ThemeContextProps = {
  sidebar: {
    status: 'hidden',
    bordered: false,
  },
  header: {
    bordered: false,
  },
};

const initSidebar = (): Sidebar => {
  const sidebar = defaultThemeContext.sidebar;
  sidebar.status =
    window.innerWidth <= deviceWidth['mobile'].maxWidth
      ? 'hidden'
      : 'collapsed';
  return sidebar;
};

const ThemeContext = createContext(defaultThemeContext);

export type { ThemeContextProps, Sidebar, SidebarStatus, Header };
export { defaultThemeContext, initSidebar };
export default ThemeContext;
