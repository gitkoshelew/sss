exports.addHash = (template, hash = 'hash:7') => {
  const isEnvProduction = process.env.NODE_ENV === 'production';
  if (process.env.PREBUILD === 'true') {
    return template;
  }
  return isEnvProduction
    ? template.replace(/\.[^.]+$/, `.[${hash}]$&`)
    : `${template}?hash=[${hash}]`;
};

exports.SagaTaskRegistry = class {
  constructor() {
    this._taskPromises = [];
  }

  addTask(task) {
    if (!this._taskPromises) {
      this._taskPromises = [];
    }
    this._taskPromises.push(task.done);
  }

  getPromise() {
    return new Promise(resolve => {
      const promises = this._taskPromises;
      if (!promises) {
        resolve();
        return;
      }
      this._taskPromises = undefined;
      Promise.all(promises)
        .then(resolve)
        .catch(resolve);
    }).then(() => {
      const promises = this._taskPromises;
      if (promises) {
        return this.getPromise();
      }
      return undefined;
    });
  }
};

// const sagaTaskRegistry = new SagaTaskRegistry();
// const sagaTask = sagaMiddleware.run(yourSaga);
// sagaTaskRegistry.addTask(sagaTask);
// sagaTaskRegistry.getPromise().then(...)
