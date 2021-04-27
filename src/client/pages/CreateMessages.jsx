import React, {useState} from "react";

import { Link } from "react-router-dom";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";
import {InputField} from "../views/InputField";
import {ChatView} from "../views/Chatview";

export function CreateMessages({userApi, messageApi}) {
    const [text, setText] = useState("");
    const { data: users, error, loading, reload } = useLoading(
        async () => await userApi.listUsers()
    );

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !users) {
        return <LoadingView />;
    }

    async function submit(e) {
        e.preventDefault();
        await messageApi.createMessage({text});
    }
    return (
        <>
            <h1>Send Message</h1>
            <select
                onChange={(e) => (e.target.value)}
            >
            {users.map(({ id, firstName, lastName}) => (
                    <option value={`/users/${id}`}>{firstName} {lastName}</option>
            ))}
            </select>
            <form onSubmit={submit}>
            <InputField label={"Message"} value={text} onChangeValue={setText} />
            <button>Submit</button>
            </form>
        </>
    );

}
