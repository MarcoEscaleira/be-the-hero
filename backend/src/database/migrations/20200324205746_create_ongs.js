
// Method up is responsible for the creation of the table
exports.up = function(knex) {
  return knex.schema.createTable("ongs", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("district").notNullable();
  })
};

// Method down is responsible when if something goes wrong we have a fallback
exports.down = function(knex) {
  return knex.schema.dropTable("ongs")
};
