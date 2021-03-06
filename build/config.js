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
