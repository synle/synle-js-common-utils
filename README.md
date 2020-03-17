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
