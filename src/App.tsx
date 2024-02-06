import { RouterProvider } from 'react-router-dom';
import './App.css';
import AudioProvider from './contexts/AudioProvider';
import MainLayoutProvider from './contexts/MainLayoutProvider';
import MainLayout from './layouts/main-layout/MainLayout';
import { router } from './shared/routes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
