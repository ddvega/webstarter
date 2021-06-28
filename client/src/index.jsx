import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-xqoxeihe.us.auth0.com"
      clientId="R9Sbf7MS45WwuZoy8QZqv5x4FYZtl01D"
      redirectUri={process.env.REACT_APP_REDIRECT}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
