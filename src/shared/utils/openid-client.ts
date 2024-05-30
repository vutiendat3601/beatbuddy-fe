const AUTH_SERVER_URL: string = process.env.REACT_APP_AUTH_SERVER_URL || '';

const webClientConfig = {
  client_id: 'web',
  redirect_uri: `${window.location.origin}/auth/callback`,
  silent_redirect_uri: `${window.location.origin}/auth/silent-callback`, // Optional activate silent-signin that use cookies between OIDC server and client javascript to restore the session
  // scope: 'openid profile email offline_access',
  scope: 'openid profile',
  authority: AUTH_SERVER_URL,
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: false,
};

export { webClientConfig };
