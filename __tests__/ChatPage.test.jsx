import * as React from "react";
import ReactDOM from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {ChatPage} from "../src/client/pages/ChatPage";

async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}
describe("Chat Page load", () =>{
    it("Loading page with username", async ()=>{
        const setUsername = () => ({
            name: "Ola",
        });
        const container = await renderForTest(
         <ChatPage onLogin={(userName) => setUsername(userName)} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("input").textContent).toEqual(
            ""
        );
    });
});