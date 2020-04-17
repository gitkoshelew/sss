'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
      return inputPath.substr(0, inputPath.length - 1);
    } else if (!hasSlash && needsSlash) {
      return `${inputPath}/`;
    } else {
      return inputPath;
    }
  }

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
  ];

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
      fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );
  
    if (extension) {
      return resolveFn(`${filePath}.${extension}`);
    }
  
    return resolveFn(`${filePath}.js`);
  };

function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
      envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('build/public'),
    appHtml: resolveApp('src/index.html'),
    appBuildHtml: resolveApp('build/public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/client.js'),
    appServerIndexJs: resolveModule(resolveApp, 'src/server.js'),
    // appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appSrcFolder: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    // publicUrl: getPublicUrl(resolveApp('package.json')),
    // servedPath: getServedPath(resolveApp('package.json')),
  };