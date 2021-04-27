import * as React from "react";
import { useLoading } from "../views/useLoading";
import {BrowserRouter, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";
import {ListUserPage} from "./ListUserPage";

export function ProfilePage({ loadProfile }) {
    const {loading, error, data} = useLoading(async () => await loadProfile());

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
//TODO: Legge til legge til bruker her
        return (
            <div>
                <h1>Profile</h1>
                <div>{data.name}</div>
                <div>{data.pid}</div>
            </div>

        );
}
