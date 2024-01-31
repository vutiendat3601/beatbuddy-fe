import './App.css';
import AudioProvider from './contexts/AudioProvider';
import MainLayout from './layouts/main-layout/MainLayout';

function App() {
  return (
    <AudioProvider>
      <MainLayout />
    </AudioProvider>
  );
}

export default App;
