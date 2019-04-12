module.exports = {
    info: {
        title: "bank-core", // Title (required)
        version: "1.0.0", // Version (required)
    },
    host: "localhost:5000", // Host (optional)
    // basePath: "/", // Base path (optional)
    // apis: ["src/api/routes/**/*.ts", "src/api/models/**/*.ts"], // Files with definitions
    apis: [
        "src/api/swagger.ts",
        "src/api/routes/**/*.ts",
        "node_modules/@radoslaw-medryk/bank-core-shared/dist/**/*.d.ts",
    ], // TODO [RM]: quite ugly hack, figure out good way
};
