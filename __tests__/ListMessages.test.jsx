import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {ListMessages} from "../src/client/pages/ListMessages";



async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}
const messageApi = {
    listMessage: async () => [{id: 1, text: "Hello React"}],
};
describe("messages list page", () => {
    it("show messages on dom", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <ListMessages messageApi={messageApi}/>
                </MemoryRouter>,
                container
        );
    });
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual("Hello React");
});
    it("can show loading screen", async () => {
        const listMessage = () => new Promise((resolve) => {});
        const container = await renderForTest(
            <ListMessages messageApi={{listMessage}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Loading ...");
    });
    it("can show error message", async () => {
        const listMessage = () => {
            throw new Error("Failed to load");
        };
        const container = await renderForTest(
            <ListMessages messageApi={{listMessage}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "Something went wrong: Error: Failed to load"
        );
    });
});