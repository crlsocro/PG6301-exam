import React, {useState} from "react";
import Select from 'react-select'
import { Link } from "react-router-dom";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";
import {InputField} from "../views/InputField";
import {ChatView} from "../views/Chatview";

export function CreateMessages({userApi}) {
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
            <h1>List Users</h1>
            <select
                onChange={(e) => (e.target.value)}
            >
            {users.map(({ id, firstName, lastName}) => (
                    <option value={`/users/${id}`}>{firstName} {lastName}</option>
            ))}
            </select>
        </>
    );

}
