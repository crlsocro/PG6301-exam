const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../src/server/messageApi"));
describe("message Api", ()=>{
    it("can return predefined users", async () => {
        await request(app).get("").then((response)=>{
            expect(response.body.find(({ id }) => id === 1)).toMatchObject({
                text: "Hello",
            });
        });
    });

    it("can create new text", async () => {
        await request(app).post("").send({
            text: "Heisann",
        }).expect(201);
        await request(app).get("").then((response)=>{
            expect(response.body.map(({ text }) => text)).toContain("Heisann");
        });
    });

});