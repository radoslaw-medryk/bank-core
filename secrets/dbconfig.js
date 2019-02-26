module.exports = {
    client: "pg",
    connection: {
        host: "localhost",
        port: "5432",
        user: "postgres",
        password: "alpine",
        database: "test",
    },
    seeds: {
        directory: "./db/seeds",
    },
};
