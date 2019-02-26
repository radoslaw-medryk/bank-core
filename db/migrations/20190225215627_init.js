exports.up = async function(knex) {
    await knex.schema.createTable("test", table => {
        table.increments("id").primary();
        table.string("name");
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable("test");
};
