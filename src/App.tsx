import { OidcProvider } from '@axa-fr/react-oidc';
import { RouterProvider } from 'react-router-dom';
import { router } from './shared/routes';
import { webClientConfig } from './shared/utils/openid-client';

function App() {
  return (
    <OidcProvider
      configuration={webClientConfig}
      // callbackSuccessComponent={AuthCallbackSuccess}
    >
      <RouterProvider router={router}></RouterProvider>
    </OidcProvider>
  );
}

export default App;
