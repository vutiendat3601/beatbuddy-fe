import { OidcProvider } from '@axa-fr/react-oidc';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './shared/routes';
import { bbwebClientConfig } from './shared/utils/openid-client';

function App() {
  return (
    <OidcProvider configuration={bbwebClientConfig}>
      <RouterProvider router={router} />
    </OidcProvider>
  );
}

export default App;
