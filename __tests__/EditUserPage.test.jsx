import { EditUserPage } from "../src/client/pages/EditUserPage";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act, Simulate } from "react-dom/test-utils";

async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

describe("edit user page", () => {
    it("can show information about an existing user", async () => {
        const getUser = () => ({
            firstName: "Olaff",
            lastName: "Nordmannen",
            email: "olaff@nordmannen.no"
        });
        const container = await renderForTest(
            <EditUserPage userApi={{getUser}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual(
            "Edit an existing user (Olaff Nordmannen,olaff@nordmannen.no)"
        );
    });

    it("can show loading screen", async () => {
        const getUser = () => new Promise((resolve) => {});
        const container = await renderForTest(
            <EditUserPage userApi={{getUser}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Loading ...");
    });

    it("can show error message", async () => {
        const getUser = () => {
            throw new Error("Failed to load");
        };
        const container = await renderForTest(
            <EditUserPage userApi={{getUser}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "Something went wrong: Error: Failed to load"
        );
    });

    it("updates server on submit", async () => {
        const users = {
            firstName: "Olaffen",
            lastName: "Nordmanneni",
            email: "olaff@nordmannen.non"
        };
        const getUser = () => users;
        const updateUser = jest.fn();
        const container = await renderForTest(
            <EditUserPage userApi={{getUser, updateUser}}/>
        );
        Simulate.change(container.querySelector("input"), {
            target: { value: "Besumniki" },
        });
        Simulate.submit(container.querySelector("form"));
        expect(updateUser).toBeCalledWith(undefined, {
            ...users,
            firstName: "Besumniki",
        });
    });
});
