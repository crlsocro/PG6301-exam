const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/userApi"));

describe("user Api", ()=>{
    it("can return predefined users", async () => {
        await request(app).get("").then((response)=>{
            expect(response.body.find(({ id }) => id === 2)).toMatchObject({
                firstName: "Kari",
                lastName: "Nordmann",
                email: "kari@nordmann.no",
            });
        });
    });

    it("can create new user", async () => {
       await request(app).post("").send({
           firstName: "Olav",
           lastName: "Nordmannen",
           email: "olaf@nordmannen.no",
       }).expect(201);
       await request(app).get("").then((response)=>{
           expect(response.body.map(({ firstName }) => firstName)).toContain("Olav");
       });
    });

});