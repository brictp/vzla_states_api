import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import routesCountry from "./routes/rCountry.js";
import connectDB from "./config/db.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/swagger-output.json" assert { type: "json" };

connectDB();

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(
  cors({
    accessControlAllowOrigin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/venezuela", routesCountry);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Iniciando express desde http://localhost:${PORT}`);
});
