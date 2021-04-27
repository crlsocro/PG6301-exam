import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import {InputField} from "../views/InputField";
import {ChatView} from "../views/Chatview";

export function ChatPage(){
    const [userName, setUsername] = useState();
    if (!userName) {
        return <ChatLoginPage onLogin={(userName) => setUsername(userName)} />;
    }
    return <ChatView username={userName} />;
}
function ChatLoginPage({onLogin}){
    const [username, setUsername] = useState("");
        function handleSubmit(e) {
        e.preventDefault();
        onLogin(username);
    }
    return (
        <div>
            <h1>Enter username</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    );
}

