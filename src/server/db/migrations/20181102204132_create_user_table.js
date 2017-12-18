
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('github_id').unique().notNullable();
    table.string('displayName').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
