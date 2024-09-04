import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import routesCountry from "./routes/rCountry.js";
import connectDB from "./config/db.js";
import createHttpError from "http-errors";

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/venezuela", routesCountry);

app.use((req, res, next) => {
  res.status(404).send(createHttpError(404, "Ruta no encontrada"));
});

app.listen(3000, () =>
  console.log(`Iniciando express desde http://localhost:${PORT}`)
);
