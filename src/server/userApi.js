const express = require("express");
const userApi = express.Router();

const users = [
    {
        id: 1,
        firstName: "Ola",
        lastName: "Nordmann",
        email: "ola@nordmann.no"
    },
    {
        id: 2,
        firstName: "Kari",
        lastName: "Nordmann",
        email: "kari@nordmann.no"
    },
];

userApi.get("", (req, res) => {
    console.log(users);
    res.json(users);
});

userApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);
    res.json(user);
});

userApi.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);
    const { firstName, lastName, email } = req.body;
    users[userIndex] = { firstName,lastName,email, id };
    res.status(200).end();
});

userApi.post("", (req, res) => {
   const {firstName, lastName, email} = req.body;
   console.log(req.body);
   users.push({firstName,lastName, email, id: users.length + 1});
    res.status(201).end();
});

module.exports = userApi;


