# Equinix-DataViz

Data visualization tool for Equinix sales team

![image](https://user-images.githubusercontent.com/954596/33912721-a7f5768a-df5c-11e7-82ee-1b053f24958e.png)

# Configuration

In the build folder you will see 3 files, `config.js`, `agents.js` and `datacenter-locations.js`

![files](https://user-images.githubusercontent.com/954596/33912742-b59a46d0-df5c-11e7-8f62-062caae9f7a2.JPG)

## config.js:

This controls qualities about the application itself. of special importance are the token and the cors proxy

```js
function config() {
  window.config = {
    /* API */

    // Timeframe in hours for a metrics call
    hours: 2,
    // your bearer token for thousand Eyes
    token: '618e6852-7c8c-44a7-8f76-72903761961d',
    // Items if this type shall be ignored. Leave as empty array if nothing to blacklist.
    blacklist: ['Oracle Cloud Locations'],

    // The URL of a CORS Proxy require to communicate with Thousand Eyes.
    // Empty string '' means no proxy
    corsProxy: 'https://cors-anywhere.herokuapp.com/',

    /* MAP COSMETICS */

    // width of lines between countries.
    countryStrokeWidth: 0.25,

    // base speed for how fast you zoom into a location
    zoomTransitionSpeed: 750,

    // Never zoom in farther than this!
    maxZoomLevel: 25,

    // these are the lines connencting nodes
    lineStrokeWidth: 0.25,

    // this is when there is a test selected and you embolden the line between nodes
    lineStrokeWidthActive: 1.75,

    // the unhovered, base radius of an agent
    agentMarkerRadius: 3.5,

    // same thing but for tests.
    testMarkerRadius: 2,

    /*MENU COSMETICS */

    // you may choose from:
    // red orange yellow olive green teal blue violet purple pink brown grey black
    // default is 'equinix red'
    latencyLabelColor: 'red',

    //how much precision should the latency data be after averaging?
    latencyDecimalPlaces: 1
  };
}

config();
```

## agents.js:

This contains a list of every known agent. These will appear as large dots on the map.

```js
[
  {
    address: '180 Peachtree Street NW Atlanta, GA 30303',
    latitude: 33.758567,
    longitude: -84.387874,
    type: 'SVC Location',
    city_state: null,
    country: 'US',
    region: 'South Atlantic',
    notes: '',
    name: 'AT1',
    isAgent: true,
    id: 50468
  },
  {
    address: '1950 North Stemmons Freeway Dallas, TX 75207',
    latitude: 32.800703,
    longitude: -96.81919,
    type: 'SVC Location',
    city_state: null,
    country: 'US',
    region: 'West South Central',
    notes: '',
    name: 'DA6',
    isAgent: true,
    id: 2,
    ignoreApi: true //remove this when you add to thousand eyes.
  }
];
```

above are two agents. One has been mapped to the API, and has a 'real' ID. (AT1) the other has a temporary Id (DA6) and the flag ignoreAPI set to true. When ignore api is true, the applicationw ill not attempt to get all the tests for this agent. As you add agents you'll want to add the right id's in this file and remove that flag.

You can get the agent id's with a call to agents like this:

```
curl -i https://api.thousandeyes.com/v6/agents.json --header "Authorization: Bearer 618e6852-7c8c-44a7-8f76-72903761961d" > agents.json
```

This will dump all know agents by the api in a list. You want to search for your agent, and fidn the Id there.

Here is what the entry for AT1 looked like: It will have an agent type of Enterprise, and also be on the equinix network.

```js
    {
      "agentId": 50468,
      "agentName": "AT1 SVC",
      "agentType": "Enterprise",
      "countryId": "US",
      "enabled": 1,
      "keepBrowserCache": 0,
      "verifySslCertificates": 1,
      "ipAddresses": ["64.191.209.3", "2607:f6f0:7001:0:64:191:209:3"],
      "lastSeen": "2017-12-12 21:54:19",
      "location": "Atlanta Area",
      "network": "Equinix, Inc. (AS 394749)",
      "prefix": "64.191.209.0/24",
      "agentState": "Online",
      "utilization": 6,
      "ipv6Policy": "PREFER_IPV6",
      "hostname": "te.at1",
      "createdDate": "2017-12-12 21:24:34"
    },
```

## datacenter-locations.js

You need to also map the id in the datacenter-locations.js

This is exactly like agents but contains every single point on the map. This is the things agents link to, the can link to tests, or also to other agents. If you add tests in the api, there must be a corresponding test with a well-formed name here. The application attempts to map all known tests for an agent to a 'real world' location from this file.

```js
    {
      address: '180 Peachtree Street NW Atlanta, GA 30303',
      latitude: 33.758567,
      longitude: -84.387874,
      type: 'SVC Location',
      city_state: null,
      country: 'USA',
      region: 'South Atlantic',
      notes: '',
      name: 'AT1',
      isAgent: true, //<---- true for agents, not for tests.
      id: 50468  //<----------- here.
    },
```
