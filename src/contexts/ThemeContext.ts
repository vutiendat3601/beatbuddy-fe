import { createContext } from 'react';

interface ThemeContextProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed?: (value: boolean) => void;
}

const defaultThemeContextProps: ThemeContextProps = {
  sidebarCollapsed: true,
};

const ThemeContext = createContext(defaultThemeContextProps);

export type { ThemeContextProps };
export default ThemeContext;
