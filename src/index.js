
import React, { useEffect, useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import routes from '@/router/index';

const App = (props) => {
  useEffect(() => {
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
            {routes.map((route, i) => {
              return <Route key={i} exact path={route.path} render={props => (
                <route.component {...props} routes={route.routes} meta={route.meta||''}/>
              )}/>
            })}
          <Redirect exact from='/' to='/test' />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  );
}
ReactDOM.render(<App/>, document.getElementById('app'));
