const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const PORT = 4005;

app.get("/events", (req, res) => {
    res.send("No events");
});

app.post("/events", async (req, res) => {
    const event = req.body;
    try {
        await axios.post("http://localhost:4000/events", {
            event,
        });
    } catch {
        console.log("Error occurred while sending the event to POST service");
    }

    try {
        await axios.post("http://localhost:4001/events", {
            event,
        });
    } catch {
        console.log(
            "Error occurred while sending the event to COMMENT service"
        );
    }

    try {
        await axios.post("http://localhost:4002/events", {
            event,
        });
    } catch {
        console.log("Error occurred while sending the event to QUERY service");
    }

    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
