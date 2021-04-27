import React, {useState} from "react";
import { Link } from "react-router-dom";
import {useLoading} from "../views/useLoading";
import {ErrorView} from "../views/ErrorView";
import {LoadingView} from "../views/LoadingView";
import {InputField} from "../views/InputField";


export function CreateMessages({messageApi}) {
    const [text, setText] = useState("");

    async function submit(e) {
        e.preventDefault();
        await messageApi.createMessage({text});
    }
    return (
        <form onSubmit={submit}>
            <h4>Send a message: ({text})</h4>
            <br/>
            <InputField label={"Message"} value={text} onChangeValue={setText} />
            <button>Submit</button>
        </form>
    );
}