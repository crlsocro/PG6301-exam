const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const userApi = require("./userApi");
const messageApi = require("./messageApi");
const apiRouter = require("./apiRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const wsServer = require("./websocket");
const messages =

app.use("/api/users", userApi);
app.use("/api/messages", messageApi);
app.use("/apiRouter", apiRouter);


const googleDiscoveryURL =
    "https://accounts.google.com/.well-known/openid-configuration";
const microsoftDiscoveryURL =
    "https://login.microsoftonline.com/common/.well-known/openid-configuration";

async function fetchJson(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}

app.use(async (req, res, next) => {
    const Authorization = req.header("Authorization");
    if (Authorization) {
        const { userinfo_endpoint } = await fetchJson(microsoftDiscoveryURL);
        req.userinfo = await fetchJson(userinfo_endpoint, {
            headers: {
                Authorization,
            },
        });
    }
    next();
});

app.get("/api/profile", async (req, res) => {
    if (!req.userinfo) {
        return res.send(401);
    }
    return res.json(req.userinfo);
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        return res.sendFile(
            path.resolve(__dirname, "..", "..", "dist", "index.html")
        );
    }
    return next();
});

const server = app.listen(3000, () => {
    server.on("upgrade", (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, (socket) => {
            // This will pass control to `wsServer.on("connection")`
            wsServer.emit("connection", socket, req);
        });
    });
    console.log(`server started on http://localhost:${server.address().port}`);
});
