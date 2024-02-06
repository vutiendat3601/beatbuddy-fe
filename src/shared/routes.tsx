import { RouteObject, createBrowserRouter } from 'react-router-dom';
import TrackDetail from '../pages/track-detail/TrackDetail';
import MainLayout from '../layouts/main-layout/MainLayout';
import AudioProvider from '../contexts/AudioProvider';
import MainLayoutProvider from '../contexts/MainLayoutProvider';

const PULBIC_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: (
      <MainLayoutProvider>
        <AudioProvider>
          <MainLayout />
        </AudioProvider>
      </MainLayoutProvider>
    ),
    children: [
      {
        path: 'track/:trackId',
        element: <TrackDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(PULBIC_ROUTES);

export { router };
