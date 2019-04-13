export const dbconfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "5432",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "alpine",
    database: process.env.DB_DATABASE || "test",
};
