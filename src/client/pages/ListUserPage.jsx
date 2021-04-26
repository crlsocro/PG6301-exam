import React from "react";
import { Link } from "react-router-dom";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";



export function ListUserPage({userApi}) {
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
            {users.map(({ id, firstName, lastName, email }) => (
                <li key={id}>
                    <Link to={`/users/${id}/edit`}>{firstName} {lastName}, {email}</Link>
                </li>
            ))}
        </>
    );
}