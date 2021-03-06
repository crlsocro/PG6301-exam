import * as React from "react";
import { useLoading } from "../views/useLoading";

import {ErrorView} from "../views/ErrorView";


export function ProfilePage({ loadProfile }) {
    const {loading, error, data} = useLoading(async () => await loadProfile());
    if (error) {
        if (error.status === 401) {
            return (
                <div>
                    <a href={authorizationUrl} target={"_self"}>
                        <button>Login</button>
                    </a>
                </div>
            );
        }
        return <ErrorView error={error} />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>An error occurred</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

        return (
            <div>
                <h1>Profile</h1>
                <div>{data.name}</div>
                <div>{data.pid}</div>
            </div>

        );
}
