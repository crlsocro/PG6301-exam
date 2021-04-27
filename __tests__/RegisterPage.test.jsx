import React from "react";
import ReactDOM from "react-dom";
import {act, Simulate} from "react-dom/test-utils";
import {MemoryRouter} from "react-router";
import {RegisterPage} from "../src/client/pages/RegisterPage";

async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

describe("create user on page", () => {
    it("create user", async () =>{
        const createUser = jest.fn();
        const container = await renderForTest(
            <RegisterPage userApi={{createUser}}/>
        );
        Simulate.change(container.querySelector("input"),{
            target: {value: "olaf"},
        });
        Simulate.submit(container.querySelector("form"));
        expect(createUser).toBeCalledWith({
            firstName: "olaf",
            lastName: "",
            email: "",
        });
    });
});