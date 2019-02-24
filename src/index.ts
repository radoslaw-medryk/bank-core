import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log("REQUEST INCOMING!");
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
