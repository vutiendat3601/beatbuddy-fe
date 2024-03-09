import { OidcProvider } from '@axa-fr/react-oidc';
import { RouterProvider } from 'react-router-dom';
import { router } from './shared/routes';
import { bbwebClientConfig } from './shared/utils/openid-client';
import AuthCallbackSuccess from './components/auth-callback-success/AuthCallbackSuccess';

function App() {
  return (
    <OidcProvider
      configuration={bbwebClientConfig}
      // callbackSuccessComponent={AuthCallbackSuccess}
    >
      <RouterProvider router={router}></RouterProvider>
    </OidcProvider>
  );
}

export default App;
