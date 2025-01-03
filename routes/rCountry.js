import { Router } from "express";
import { cCountry } from "../controllers/cCountry.js";

const routes = Router();

routes.get("/", cCountry.getAll);
routes.get("/estados", cCountry.getArrayStates);
routes.get("/municipios", cCountry.getAllMunicipalities);

routes.get("/:stateName", cCountry.getState);
routes.get("/:stateName/municipios", cCountry.getMunicipality);
routes.get("/:stateName/:municipalityName", cCountry.getDistricts);

routes.post("/", cCountry.create);
routes.put("/:id", cCountry.update);
routes.post("/:stateName", cCountry.createMunicipality);
routes.delete("/:id", cCountry.delete);

export default routes;
