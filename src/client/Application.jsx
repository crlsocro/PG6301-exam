import * as React from "react";
import {useEffect, useState} from "react";
import {BrowserRouter, Link} from "react-router-dom";
import { Redirect, Route, Switch} from "react-router";
import {ProfilePage} from "./pages/ProfilePage";
import {fetchJSON, postJSON} from "./http";
import {LoginPage} from "./pages/LoginPage";
import {LoginCallbackPage} from "./pages/LoginCallbackPage";
import {ChatPage} from "./pages/ChatPage";
import {CreateMessages} from "./pages/CreateMessages";
import {ListUserPage} from "./pages/ListUserPage";
import {RegisterPage} from "./pages/RegisterPage";
import {EditUserPage} from "./pages/EditUserPage";
import {ListMessages} from "./pages/ListMessages";


export function Application() {

    const [access_token, setAccess_token] = useState();

    const googleIdentityProvider = {
        discoveryURL:
            "https://accounts.google.com/.well-known/openid-configuration",
        client_id:
            "552475040931-h2ajjmbvi39rb15lati8t0audn3n9s50.apps.googleusercontent.com",
        scope: "openid profile email",
    };
    const microsoftIdentityProvider = {
        discoveryURL:
            "https://login.microsoftonline.com/common/.well-known/openid-configuration",
        client_id: "a05a0f74-6fb4-4e1b-a360-d288034d6432",
        scope: "openid profile email",
    };

    async function loadProfile() {
        return fetchJSON("/api/profile", {
            headers: {
                ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
            },
        });
    }
    const userApi = {
        listUsers: async () => await fetchJSON("/api/users"),
        getUser: async (id) => await fetchJSON(`/api/users/${id}`),
        createUser: async ({firstName, lastName, email}) =>{
            return postJSON("/api/users", {
                method: "POST",
                json: {firstName, lastName, email},
            });
        },
        updateUser: async (id, {firstName, lastName, email}) =>
            postJSON(`/api/users/${id}`, {
                method: "PUT",
                json: {firstName, lastName, email},
            }),
    };
    const messageApi = {
        listMessage: async () => await fetchJSON("/api/messages"),
        createMessage: async ({text}) =>{
            return postJSON("/api/messages", {
                method: "POST",
                json: {text},
            });
        },
        updateMessage: async (id, {text}) =>
            postJSON(`/api/messages/${id}`, {
                method: "PUT",
                json: {text},
            }),
    };

    return (
        <BrowserRouter>
            <main>
                <nav>
                    <Link to={"/"}>Home</Link>
                </nav>
                <Switch>
                    <Route path={"/profile"}>
                        <ProfilePage loadProfile={loadProfile} />
                    </Route>
                    <Route path={"/login"} exact>
                        <LoginPage identityProvider={microsoftIdentityProvider} />
                    </Route>
                    <Route path={"/login/callback"}>
                        <LoginCallbackPage identityProvider={microsoftIdentityProvider} onAccessToken={access_token => setAccess_token(access_token)}/>
                    </Route>
                <Route path={"/Register"}>
                    <RegisterPage userApi={userApi} />
                </Route>
                <Route exact path={"/ShowUsers"}>
                    <ListUserPage userApi={userApi}/>
                </Route>
                <Route path={"/users/:id/edit"}>
                    <EditUserPage userApi={userApi} />
                </Route>
                <Route exact path={"/CreateMessage"}>
                    <CreateMessages userApi = {userApi} messageApi={messageApi}/>
                </Route>
                <Route exact path={"/Chat"}>
                    <ChatPage />
                </Route>
                <Route exact path={"/messages"}>
                       <ListMessages messageApi={messageApi}/>
                </Route>
                <Route exact path={"/"}>
                    <h1>Message Application</h1>
                    <ul>
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                    </ul>
                    <ul id="users">
                        <li>
                            <Link to={"/ShowUsers"}>Show Users</Link>
                        </li>
                        <li>
                            <Link to={"/Register"}>Register User</Link>
                        </li>
                    </ul>
                    <ul id="messages">
                        <li>
                            <Link to={"/CreateMessage"}>Create Message</Link>
                        </li>
                        <li>
                            <Link to={"/messages"}>See Messages</Link>
                        </li>
                        <li>
                            <Link to={"/chat"}>Chat</Link>
                        </li>
                    </ul>
                </Route>
                </Switch>
            </main>
        </BrowserRouter>
    );
}
