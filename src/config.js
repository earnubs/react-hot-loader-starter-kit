import json5 from 'json5';
import nconf from 'nconf';


export default nconf
  .env({
    separator: '_',
    lowerCase: true,
    parseValues: true
  })
  .required([
    'oauth:github:secret',
    'session:secret'
  ]) // patched required() to chain, available in next version of nconf
  .argv()
  .use('file', { format: json5, file: './configs/development.json' });
