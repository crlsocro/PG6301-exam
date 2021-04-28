import * as React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {ProfilePage} from "../src/client/pages/ProfilePage";


async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

describe("ProfilePage", () => {
    it("List profile", async () =>{
        const loadProfile = () => ({
            name: "Ola",
            pid:"Nordmann"
        });
        const container = await renderForTest(
            <ProfilePage loadProfile={loadProfile} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "OlaNordmann"
        );
    });
    it("can show error message", async () => {
        const loadProfile = () => {
            throw new Error("Failed to load");
        };
        const container = await renderForTest(
            <ProfilePage loadProfile={loadProfile}/>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual(
            "Something went wrong: Error: Failed to load"
        );
    });
});