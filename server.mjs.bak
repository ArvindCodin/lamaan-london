import { createRequestHandler } from "@react-router/express";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;

const app = express();

app.use(
  "/assets",
  express.static(path.join(__dirname, "build/client/assets"), {
    immutable: true,
    maxAge: "1y",
  })
);
app.use(express.static(path.join(__dirname, "build/client"), { maxAge: "1h" }));

const build = await import("./build/server/index.js");

app.all("*", createRequestHandler({ build }));

app.listen(port, "0.0.0.0", () => {
  console.log(`La'maan London running on http://localhost:${port}`);
});
