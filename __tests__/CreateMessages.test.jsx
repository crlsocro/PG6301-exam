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
const userApi = {
    listUsers: async () => [{ id: 1, firstName: "Harald", lastName: "Svensken" }],
};

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
    it("show users on dom", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <CreateMessages userApi={userApi}/>
                </MemoryRouter>,
                container
            );
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "Harald Svensken"
        );
    });
});