import React from "react";
import { Link } from "react-router-dom";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";

export function ListMessages({messageApi}) {
    const { data: messages, error, loading, reload } = useLoading(
        async () => await messageApi.listMessage()
    );

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !messages) {
        return <LoadingView />;
    }

    return (
        <>
            <h1>List Messages</h1>
            {messages.map(({ id, text}) => (
                <li key={id}>
                    <Link to={`/messages/${id}`}>{text}</Link>
                </li>
            ))}
        </>
    );
}