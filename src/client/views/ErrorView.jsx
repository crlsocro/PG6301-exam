import React from "react";
import {Link} from "react-router-dom";

//Code copied from johannes lecture 9 and 11: source material: https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures.git


export function ErrorView({ error, reload }) {
    if (error.status === 401) {
        return (
            <div>
                You are not logged in{" "}
                <Link to={"/login"}>
                    <button>Log in</button>
                </Link>
            </div>
        );
    }
    return (
        <>
            <div>Something went wrong: {error.toString()}</div>
            {reload && <button onClick={reload}>Try again</button>}
        </>
    );
}
