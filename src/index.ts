import "dotenv/config";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import postRoutes from "./routes/posts";

const PORT = Number(process.env.PORT) || 3000;
const app = new Elysia();

app
  .use(swagger())
  .group("/api", (app) => app.use(postRoutes))
  .listen(PORT)

console.log(`Elysia running at http://localhost:${PORT} ...`);
console.log(`Swagger running at http://localhost:${PORT}/swagger ...`);
