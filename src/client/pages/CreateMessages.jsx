import React, {useState} from "react";
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
            <div>
                {users.map(({ id, firstName, lastName, email }) => (
                     function(e) {
                    var options = e.target.options;
                    var value = [];
                    for (var i = 0, l = options.length; i < l; i++) {
                    if (options[i].selected) {
                    value.push(options[i].value);
                        }
                    }
                    this.props.someCallback(value);
                    }
                    ))}
            </div>
        </>
    );

}
