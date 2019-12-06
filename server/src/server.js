import 'core-js';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './components/Routes';
import renderer from './helpers/renderer';
import paths from '../config/paths';
import env from '../config/env';
// import createStore from './thunkStore/createStoreServer'; // use thunkStore
import createStore from './sagaStore/createStoreServer'; // use sagaStore

const app = express();

app.use(
  '/api',
  proxy(env.apiUrl, {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);

app.use(express.static('build/public'));


// use thunkStore

// app.get('*', (req, res) => {
//   const store = createStore(req);

//   const promises = matchRoutes(Routes, req.path)
//     .map(({ route }) => {
//       return route.loadData ? route.loadData(store) : null;
//     })
//     .map(promise => {
//       console.log(promise)
//       if (promise) {
//         return new Promise((resolve, reject) => {
//           promise.then(resolve).catch(resolve);
//         });
//       }
//     });

//   Promise.all(promises).then(() => {
//     const context = {};
//     const content = renderer(req, store, context);

//     if (context.url) {
//       return res.redirect(301, context.url);
//     }
//     if (context.notFound) {
//       res.status(404);
//     }

//     res.send(content);
//   });
// });


// use sagaStore

app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
  .map(({ route }) => {
    return route.loadGeneratorData ? route.loadGeneratorData : null;
  })
  .filter(generator=>!!generator)
  .map(generator=>{
    const sagaTaskPromise = store.runSaga(generator).toPromise();
    return new Promise((resolve, reject) => {
      sagaTaskPromise.then(resolve).catch(resolve);
    });
  })

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
  
  store.close();
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});