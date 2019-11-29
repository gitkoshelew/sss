exports.addHash = (template, hash='hash:7') => {
    const isEnvProduction = process.env.NODE_ENV === 'production';
    if (process.env.PREBUILD === 'true'){
      return template
    }
    return isEnvProduction ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`
}