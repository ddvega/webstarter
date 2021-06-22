import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { Users } from './screens/Users';
import { Profile } from './screens/Profile';

export const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </>
    </BrowserRouter>
  );
};
