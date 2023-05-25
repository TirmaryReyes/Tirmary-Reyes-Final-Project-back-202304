import "./loadEnvironment.js";
import createDebug from "debug";
import { app } from "./server/index.js";

export const debug = createDebug("sandRose-api:root");

export const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(`listening on http://localhost:${port}`);
});
