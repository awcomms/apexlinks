import { handler } from "./build/handler.js";
import { getIO } from "./src/lib/getIO.js";

import express from "express";
import { createServer } from "http";

const app = express();
app.use(handler);

const server = createServer(app);

const io = getIO(server);

server.listen("3000", "0.0.0.0");
