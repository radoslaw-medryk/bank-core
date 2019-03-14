// Update with your config settings.

const dbconfig = require("./src/secrets/dbconfig");

module.exports = {
    development: {
        client: "pg",
        connection: dbconfig,
    },
};
