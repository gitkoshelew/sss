import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
const {js, css} = require('../../public/assets/assets.json').main;
import Routes from '../client/Routes';

const assetsUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8040/assets/' : './assets/';

const parseAssets = (assets) => {
  if (typeof assets === 'string'){
    return [
      assets.replace('./', assetsUrl)
    ]
  };

  if (Array.isArray(assets)){
    return assets.map(asset => typeof asset === 'string' ? asset.replace('./', assetsUrl) : '')
  };

  return []
}

const renderCssLinks = parseAssets(css).reduce((acc, cssUrl) => {
  return acc + `<link rel="stylesheet" href="${cssUrl}">`
}, '');

const renderJsLinks = parseAssets(js).reduce((acc, jsUrl) => {
  return acc + `<script type="application/javascript" src="${jsUrl}"></script>`
}, '')

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
        ${renderCssLinks}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        ${renderJsLinks}
      </body>
    </html>
  `;
};
