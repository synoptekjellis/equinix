const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://api.thousandeyes.com';
const api = `${BASE_URL}/v6`;
const apiToken = '29bc9c84-0bac-4e39-80f3-79d896073113';
const routes = {
  agent: id => {
    return `${api}/agents/${id}`;
  },
  test: (id, hours) => {
    hours = hours || 2;
    return `${api}/tests/${id}?window=${hours}h`;
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

const getTest = (id, hours) => {
  return getRoute(routes.test(id, hours))();
};

const getConfig = () => {
  return getRoute(routes.config())();
};

export { getAgent, getTest, getConfig };
