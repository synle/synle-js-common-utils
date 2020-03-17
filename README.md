# synle-js-common-utils

#### useRestApi custom hook
```
import { useRestApi } from 'CustomReactHooks';
import RestApi from 'SomeRestAPI';
```

##### For single API calls
```
... within your react render
const [{ isLoading, response: activities }, _reloadActivities] = useRestApi(
  () => RestApi.getActivities(prospectId, campaignId),
  prospectId,
  campaignId,
);
```

##### For multiple API calls
```
const [{ isLoading, isError, response }, refreshProspectInfo] = useRestApi(
  () =>
    $Promise.all([
      RestApi.getCampaignByCampaignId(campaignId),
      RestApi.getProspectByProspectId(prospectId),
    ]),
  campaignId,
  prospectId,
);

const [campaign, prospect] = response;
```

#### useDebouncedFunc custom hook
Will be very good to be used in junction with typeahead search
```
import { useDebouncedFunc } from 'CustomReactHooks';
import RestApi from 'SomeRestAPI';
```

##### Example
```
... within your component
const [{ isLoading }, _doSearch] = useDebouncedFunc(async (targetKeyword) => {
  const resp = await RestApi.searchByEntityAndKeyword(entityType, targetKeyword, 100, 0);
  setMatches(resp);
}, 1500);
```



#### redux/react store boilder plate
##### reducers.ts
```
import { createStore, applyMiddleware, compose } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

import rootReducers from './rootReducers';

let middlewares = [reduxThunk, reduxPromise];
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  if (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
    // with redux devtool
    composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
  } else {
    // if you don't have redux devtool
    // attach redux logger
    composeEnhancers = compose;
    middlewares = middlewares.concat(reduxLogger);
  }
}

const MainAppStore = createStore(rootReducers, composeEnhancers(applyMiddleware(...middlewares)));
window['AppStore'] = MainAppStore; // TODO: this is strictly for debug, please don't use it for production code...
export default MainAppStore;
```

##### ReduxActions - redux action creators
```
export enum ACTION_KEYS {
  Me_LogIn = 'Me_LogIn',
  Me_LogOut = 'Me_LogOut',
}

// nav related
export const login = (meProfile) => (dispatch) => {
  dispatch({
    type: ACTION_KEYS.Me_LogIn,
    data: meProfile,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: ACTION_KEYS.Me_LogOut,
  });
};
```

##### simple reducer
```
import { ACTION_KEYS } from 'ReduxActions';
import { SendbloomData } from '../../global';

const DEFAULT_VALUE = { loading: true };

export default function me(state: SendbloomData.MeProfile, action) {
  state = state || DEFAULT_VALUE;

  switch (action.type) {
    case ACTION_KEYS.Me_LogIn:
      return action.data;
    case ACTION_KEYS.Me_LogOut:
    default:
      return state;
  }
}
```

##### App.js with react router
```
// packageJson.homepage = "/fe"

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import PackageJson from 'package.json';
import AppStore from './reducers';
import ProspectListPage from './pages/ProspectListPage';
import ProspectInfoPage from './pages/ProspectInfoPage';

<Provider store={AppStore}>
  <div className='AppContainer'>
    <Router basename={PackageJson.homepage}>
      <Switch>
        <Route exact path='/home' component={HomePage} />

        {/* prospect */}
        <Route exact path='/prospects' component={ProspectListPage} />
        <Route exact path='/prospect/:prospect_id' component={ProspectInfoPage} />

        {/* Fallback route */}
        <Redirect to='/dashboard' />
      </Switch>
    </Router>
  </div>
</Provider>
```

##### Accessing path param `:prospect_id`
```
import { useParams } from 'react-router-dom';

...

const { prospect_id: prospectId } = useParams();
```


##### `dispatch` actions
```
import { useDispatch } from 'react-redux';

...

const dispatch = useDispatch();
useEffect(() => {
  dispatch(Actions.setNav('/prospects', ''));
}, [dispatch]);
```


#### `useSelector`
```
import { useSelector } from 'react-redux';
import * as Selectors from 'selectors';

...

const myNotifications = useSelector(Selectors.myNotifications);
```

### Note on Scss and Webpack
Best to add a `SCSS_PATH` so that we can refer to scss styles with absolue path.

Put this into your `.env` file
```
SASS_PATH=./node_modules:./src:./src/styles
```

Then you can layout your common / core styles there in this folder `./src/styles`. For example if you have this file `./src/styles/_variables.scss`. You can then import it at anywhere in your react app scss file as

#### SomeComponent.scss
```
@import '_variables';

.SomeComponent{
  &__Header{}
  &__Body{}
}
```
