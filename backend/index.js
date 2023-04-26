import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.warn(`Server is listening on ${port}`);
  }
});
