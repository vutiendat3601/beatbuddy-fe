import './App.css';
import AudioProvider from './contexts/AudioProvider';
import MainLayoutProvider from './contexts/MainLayoutProvider';
import MainLayout from './layouts/main-layout/MainLayout';

function App() {
  return (
    <MainLayoutProvider>
      <AudioProvider>
        <MainLayout />
      </AudioProvider>
    </MainLayoutProvider>
  );
}

export default App;
