import {useEffect, useState} from "react";
import * as React from "react";

export function ChatView({ username }) {
    const [chatLog, setChatLog] = useState([]);
    const [message, setMessage] = useState("");
    const [ws, setWs] = useState();

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");
        ws.onmessage = (event) => {
            console.log("message", event);
            const { message, id, username } = JSON.parse(event.data);
            setChatLog((chatLog) => [...chatLog, { message, id, username }]);
        };
        ws.onopen = (event) => {
            ws.send(
                JSON.stringify({
                    type: "login",
                    username,
                })
            );
        };
        setWs(ws);
    }, []);

    function handleSubmitMessage(e) {
        e.preventDefault();
        ws.send(
            JSON.stringify({
                type: "message",
                message: message,
            })
        );
        setMessage("");
    }

    return (
        <div>
            <h1>Chat page</h1>
            <div>
                {chatLog.map(({ message, id, username }) => (
                    <div key={id}>
                        <strong>{username}: </strong>
                        {message}
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmitMessage}>
                    <input
                        type="text"
                        autoFocus={true}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
}