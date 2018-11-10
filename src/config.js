import json5 from 'json5';
import nconf from 'nconf';

nconf.argv()
  .env({
    separator: '_',
    lowerCase: true,
    parseValues: true
  })
  .use('file', { format: json5, file: './configs/development.json' });

nconf.required([
  'oauth:github:secret',
  'session:secret'
]);

export default nconf;
