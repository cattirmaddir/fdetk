import express, { type Express } from "express";
import path from "node:path";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.set("trust proxy", 1);

app.use((req, res, next) => {
  const forwardedProto = req.get("x-forwarded-proto");

  if (forwardedProto === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const staticRoot = path.resolve(
  import.meta.dirname,
  "../../../artifacts/snorlax-cave/dist/public",
);

app.get("/", (_req, res) => res.sendFile(path.join(staticRoot, "index.html")));
app.get("/math", (_req, res) => res.sendFile(path.join(staticRoot, "Games.html")));
app.get("/english", (_req, res) => res.sendFile(path.join(staticRoot, "Apps.html")));
app.get("/about", (_req, res) => res.sendFile(path.join(staticRoot, "About.html")));
app.get("/settings", (_req, res) => res.sendFile(path.join(staticRoot, "Settings.html")));
app.get("/portal", (_req, res) => res.sendFile(path.join(staticRoot, "loader.html")));
app.get("/dashboard", (_req, res) => res.sendFile(path.join(staticRoot, "agloader.html")));

app.use(express.static(staticRoot));

export default app;
