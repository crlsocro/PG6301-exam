import React from "react";

//Code copied from jhannes lecture 11: source material: https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures.git

export function InputField({ label, onChangeValue, value, type = "text" }) {
    return (
        <div>
            <label>
                {label}:{" "}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChangeValue(e.target.value)}
                />
            </label>
        </div>
    );
}
