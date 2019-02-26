import * as Knex from "knex";

const table = "test";

const data = [
  {id: 1, name: "Radoslaw"},
  {id: 2, name: "Zoey"},
];

exports.seed = async (knex: Knex) => {
  await knex(table).del();
  await knex(table).insert(data);
};
