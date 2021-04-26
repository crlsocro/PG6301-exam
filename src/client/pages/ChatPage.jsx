import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { ChatView } from "../views/ChatView";

export function ChatPage() {
    const [chatLog, setChatLog] = useState([]);
    const [ws, setWs] = useState();
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");
        ws.onopen = (event) => {
            console.log("opened", event);
        };
        ws.onmessage = (event) => {
            console.log("from server", event);
            setChatLog((chatLog) => [...chatLog, event.data]);
        };
        ws.onclose = (event) => {
            console.log("close", event);
        };
        setWs(ws);
    }, []);

    return (
        <ChatView chatLog={chatLog} onSendMessage={(message) => ws.send(message)} />
    );
}