import { OidcSecure } from '@axa-fr/react-oidc';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import AudioProvider from '../contexts/AudioProvider';
import MainLayoutProvider from '../contexts/MainLayoutProvider';
import MainLayout from '../layouts/main-layout/MainLayout';
import ArtistDetail from '../pages/artist-detail/ArtistDetail';
import SignIn from '../pages/auth/sign-in/SignIn';
import Home from '../pages/home/Home';
import Library from '../pages/library/Library';
import PlaylistDetail from '../pages/playlist-detail/PlaylistDetail';
import TrackDetail from '../pages/track-detail/TrackDetail';
import UserDetail from '../pages/user-detail/UserDetail';
import Playing from '../pages/playing/Playing';
import SearchDetail from '../pages/search-detail/SearchDetail';

const ROUTES: RouteObject[] = [
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
        index: true,
        element: <Home />,
      },
      {
        path: 'library',
        element: <Library />,
      },
      {
        path: 'track/:trackId',
        element: <TrackDetail />,
      },
      {
        path: 'artist/:artistId',
        element: <ArtistDetail />,
      },
      {
        path: 'playlist/:playlistId',
        element: (
          <OidcSecure>
            <PlaylistDetail />
          </OidcSecure>
        ),
      },
      {
        path: 'search',
        element: <SearchDetail />,
      },
      {
        path: 'user',
        element: (
          <OidcSecure>
            <UserDetail />
          </OidcSecure>
        ),
      },
    ],
  },
  {
    path: '/playing',
    element: (
      <OidcSecure>
        <Playing />
      </OidcSecure>
    ),
  },
  {
    path: '/auth/sign-in',
    element: (
      <OidcSecure>
        <SignIn />
      </OidcSecure>
    ),
  },
];

const router = createBrowserRouter(ROUTES);

export { router };
