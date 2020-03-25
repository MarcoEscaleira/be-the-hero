
// Method up is responsible for the creation of the table
exports.up = function(knex) {
  return knex.schema.createTable("incidents", function (table) {
    table.increments();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("value").notNullable();
    
    table.string("ong_id").notNullable();

    table.foreign("ong_id").references('id').inTable("ongs");
  })
};

// Method down is responsible when if something goes wrong we have a fallback
exports.down = function(knex) {
  return knex.schema.dropTable("incidents")
};
