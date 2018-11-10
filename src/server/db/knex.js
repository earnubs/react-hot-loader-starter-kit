import knex from 'knex';

import configs from '../../../knexfile';

export default knex(configs[process.env.NODE_ENV || 'development']);
