import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log("REQUEST INCOMING!");
    const result = db("test").select().then(q => console.log(q));
    console.log(result);
    // db("test").insert({
    //     name: "Zoey",
    // }).
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// TODO [RM]: figure out how to use knex with typescript and migrations/seeds properly
