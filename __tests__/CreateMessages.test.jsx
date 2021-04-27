import React from "react";
import ReactDOM from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import {MemoryRouter} from "react-router";
import {CreateMessages} from "../src/client/pages/CreateMessages";

async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

describe("create text on page", () => {
    it("create text", async () =>{
        const createMessage = jest.fn();
        const container = await renderForTest(
            <CreateMessages messageApi={{createMessage}}/>
        );
        Simulate.change(container.querySelector("input"),{
            target: {value: "hei"}
        });
        Simulate.submit(container.querySelector("form"));
        expect(createMessage).toBeCalledWith({
            text: "hei",
        });
    });
});