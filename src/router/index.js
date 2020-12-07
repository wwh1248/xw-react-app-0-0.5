import {lazy} from 'react';

const routes = [{
  path: '/test',
  component: lazy(() => import(/* webpackPrefetch: true */'@/pages/test/index.jsx')),
}];

export default routes;