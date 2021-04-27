const express = require("express");
const messageApi = express.Router();

const messages = [
    {
        id: 1,
        text: "Hello"
    },
    {
        id: 2,
        text: "Express"
    },
];
messageApi.get("", (req, res) => {
    console.log(messages);
    res.json(messages);
});
messageApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages.find((m) => m.id === id);
    res.json(message);
});
messageApi.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const messageIndex = messages.findIndex((m) => m.id === id);
    const {text } = req.body;
    messages[messageIndex] = { text, id };
    res.status(200).end();
});
messageApi.post("", (req, res) => {
    const {text} = req.body;
    console.log(req.body);
    messages.push({text, id: messages.length + 1});
    res.status(201).end();
});
module.exports = messageApi;



