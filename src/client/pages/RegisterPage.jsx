import React, { useState } from "react";
import {InputField} from "../views/InputField";

export function RegisterPage({userApi}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    async function submit(e) {
        e.preventDefault();
        await userApi.createUser({firstName, lastName, email});
    }
    return (
        <form onSubmit={submit}>
            <h4>Register a user: ({firstName} {lastName},{email})</h4>
            <br/>
            <InputField label={"First Name"} value={firstName} onChangeValue={setFirstName} />
            <InputField label={"Last Name"} value={lastName} onChangeValue={setLastName} />
            <InputField label={"Email"} value={email} onChangeValue={setEmail} />
            <button>Submit</button>
        </form>
    );
}