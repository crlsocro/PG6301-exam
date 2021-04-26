import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ListUserPage } from "../src/client/pages/ListUserPage"
import { MemoryRouter } from "react-router";
import {EditUserPage} from "../src/client/pages/EditUserPage";


async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

const userApi = {
    listUsers: async () => [{ id: 1, firstName: "Harald", lastName: "Svensken", email: "harald@svensken.no" }],
};
describe("users list page", () => {
    it("show users on dom", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {
            ReactDOM.render(
                <MemoryRouter>
                    <ListUserPage userApi={userApi}/>
                </MemoryRouter>,
                container
            );
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual(
            "Harald Svensken, harald@svensken.no"
        );
    });
    it("can show loading screen", async () => {
        const listUsers = () => new Promise((resolve) => {});
        const container = await renderForTest(
            <ListUserPage userApi={{listUsers}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Loading ...");
    });
    it("can show error message", async () => {
        const listUsers = () => {
            throw new Error("Failed to load");
        };
        const container = await renderForTest(
            <ListUserPage userApi={{listUsers}}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "Something went wrong: Error: Failed to load"
        );
    });
});