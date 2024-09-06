import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "Vzla states API",
    description:
      "API para ver informacion de los estados y municipios venezolanos",
  },
  host: "http://localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["../app.js"];

swaggerAutogen(outputFile, routes, doc);
