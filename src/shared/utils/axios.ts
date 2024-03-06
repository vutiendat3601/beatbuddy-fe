import axios from 'axios';
import { redirect } from 'react-router-dom';

const bbapiUrl = process.env.REACT_APP_BBAPI_URL;

const bbapi = axios.create({
  baseURL: bbapiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// bbapi.interceptors.request.use(
// );

bbapi.interceptors.response.use(
  function (resp) {
    return resp;
  },
  function (error) {
    let resp = error.response;
    if (resp.status === 401) {
      redirect('/');
    }
    return resp;
  }
);

export { bbapi };
