import React from "react";
import { Link } from "react-router-dom";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";


export function CreateMessages({userApi}) {
    async function submit(e) {
        e.preventDefault();
        await userApi.listUsers({firstName, lastName});
    }

    const { data: users, error, loading, reload } = useLoading(
        async () => await userApi.listUsers()
    );
    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !users) {
        return <LoadingView />;
    }
    return (
        <>
            <h1>Send Message</h1>
            <form onSubmit={submit}>
            {users.map(({ id, firstName, lastName}) => (
                <select  key={id}>
                    <option value={`/users/${id}`}>{firstName} {lastName}</option>
                </select>
            ))}
                <button>Submit</button>
            </form>
        </>
    );
}