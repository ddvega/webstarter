// import React from 'react';
// import '../styles/globals.css';
// import Router from 'next/router';

// import { Auth0Provider } from '@auth0/auth0-react';

// const onRedirectCallback = (appState) => {
//   Router.replace(appState?.returnTo || '/');
// };

// function MyApp({ Component, pageProps }) {
//   return (
//     <Auth0Provider
//       domain="dev-xqoxeihe.us.auth0.com"
//       clientId="GBT4UUX88lNVsfFcJXtuLzFIVAAy1lNh"
//       scope="read:users"
//       redirectUri={typeof window !== 'undefined' && window.location.origin}
//       onRedirectCallback={onRedirectCallback}
//     >
//       <Component {...pageProps} />
//     </Auth0Provider>
//   );
// }

// export default MyApp;

import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
