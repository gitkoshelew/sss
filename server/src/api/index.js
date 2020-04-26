import fetch from 'isomorphic-fetch';
import status from 'statuses';

export const fetchApi = url => api => {
  api.get(url).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const fetchUrl = url => () =>
  fetch(`http://react-ssr-api.herokuapp.com${url}`).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });

export const getAxiosApi = url => api => () =>
  api
    .get(url)
    .then(res => res.data)
    .catch(err => {
      if (err.response.data) {
        console.log('Problem With Response ', err.response.data.message);
        return { error: `Problem With Response ${err.response.data.message}` };
      }
      if (err.response.status) {
        console.log('Problem With Response ', err.response.status);
        return { error: `Problem With Response. Status: ${status[err.response.status]}` };
      }
      if (err.request) {
        console.log('Problem With Request!');
        return { error: 'Problem With Request!' };
      }
      console.log('Error', err.message);
      return { error: err.message };
    });

export const postAxiosApi = (url, data) => api => () =>
  api
    .post(url, data)
    .then(res => res.data)
    .catch(err => {
      if (err.response.data) {
        console.log('Problem With Response ', err.response.data.message);
        return { error: `Problem With Response ${err.response.data.message}` };
      }
      if (err.response.status) {
        console.log('Problem With Response ', err.response.status);
        return { error: `Problem With Response. Status: ${status[err.response.status]}` };
      }
      if (err.request) {
        console.log('Problem With Request!');
        return { error: 'Problem With Request!' };
      }
      console.log('Error', err.message);
      return { error: err.message };
    });

export const putAxiosApi = (url, data) => api => () =>
  api
    .put(url, data)
    .then(res => res.data)
    .catch(err => {
      if (err.response.data) {
        console.log('Problem With Response ', err.response.data.message);
        return { error: `Problem With Response ${err.response.data.message}` };
      }
      if (err.response.status) {
        console.log('Problem With Response ', err.response.status);
        return { error: `Problem With Response. Status: ${status[err.response.status]}` };
      }
      if (err.request) {
        console.log('Problem With Request!');
        return { error: 'Problem With Request!' };
      }
      console.log('Error', err.message);
      return { error: err.message };
    });
