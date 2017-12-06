const CORS_PROXY = `https://cors-anywhere.herokuapp.com/`;
const BASE_URL = `${CORS_PROXY}https://api.thousandeyes.com`;
const api = `${BASE_URL}/v6`;
const apiToken = '29bc9c84-0bac-4e39-80f3-79d896073113';

const routes = {
  agent: id => {
    return `${api}/agents/${id}`;
  },
  tests: () => {
    return `${api}/tests/`;
  },
  testMetrics: (id, hours) => {
    hours = hours || 2;
    return `${api}/net/metrics/${id}?window=${hours}h`;
  },
  config: () => {
    return 'app-config.json';
  }
};

function getJson(response) {
  return response.json();
}
function processStatus(response) {
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response);
  }
  return Promise.reject(
    new Error(`${response.status} : ${response.statusText}`)
  );
}

function getRoute(route, validation) {
  return options => {
    if (validation) {
      //validate here if needed
    }

    let _route = route;
    return fetch(_route, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(processStatus)
      .then(getJson)
      .then(data => data.payload || data);
  };
}

const getAgent = id => {
  return getRoute(routes.agent(id))();
};

const getTestMetrics = (id, hours) => {
  return getRoute(routes.testMetrics(id, hours))();
};

const getTests = () => {
  return getRoute(routes.tests())();
};

const getConfig = () => {
  return getRoute(routes.config())();
};

export { getAgent, getTestMetrics, getConfig, getTests };
