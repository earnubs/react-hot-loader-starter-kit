import chalk from 'chalk';

import config from '../config';
import app from '../server';

app.listen(config.get('port'), () => console.log( // eslint-disable-line no-console
  chalk.bold.red('PRODUCTION SERVER: listening on port 3000')
));
