import React, { useState } from "react";
import { useParams } from "react-router";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";
import {InputField} from "../views/InputField";

function EditUserForm({user, onSubmit}){
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    async function submit(e){
        onSubmit(e, {firstName, lastName, email});
    }
    return (
        <form onSubmit={submit}>
            <InputField label={"First Name"} value={firstName} onChangeValue={setFirstName} />
            <InputField label={"Last Name"} value={lastName} onChangeValue={setLastName} />
            <InputField label={"Email"} value={email} onChangeValue={setEmail} />
            <button>Submit</button>
            <h4>Edit an existing user ({firstName} {lastName},{email})</h4>
        </form>
    );
}


export function EditUserPage({userApi}) {
    const {id} = useParams();
    const { data: user, loading, error, reload } = useLoading(
        async () => await userApi.getUser(id),
        [id]
    );
    async function handleSubmit(e, { firstName, lastName, email }) {
        e.preventDefault();
        await userApi.updateUser(id, {firstName, lastName, email});
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !user) {
        return <LoadingView />;
    }

    return <EditUserForm user={user} onSubmit={handleSubmit}/>;
}
