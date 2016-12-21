// @flow
import createBrowserHistory from 'history/createBrowserHistory';

import enhanceLocation from '../util/enhance-location';
import install from '../install';

type BrowserRouterArgs = {
  routes: Object,
  basename: string,
  getLocation: () => Location,
  passRouterStateToReducer?: bool
};

/* istanbul ignore next: unstubbable! */
const realLocation = () => window.location;

export default ({
  routes,
  basename,
  getLocation = realLocation
}: BrowserRouterArgs) => {
  const history = createBrowserHistory({ basename });

  const { pathname, search } = getLocation();
  const descriptor = basename
    ? { pathname, basename, search }
    : { pathname, search };

  const location = enhanceLocation(descriptor);

  return install({ routes, history, location });
};