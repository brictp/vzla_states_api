import { mCountry } from "../models/mCountry.js";
import { Helper } from "../middlewares/helper.js";

export class cCountry {
  static async getAll(req, res) {
    try {
      const data = await mCountry.getAllStates();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getState(req, res) {
    let name = req.params.stateName;

    name = Helper.capitalizeName(name);
    
    try {
      let data = await mCountry.getState(name);
      //console.log(name)

      if (data.length === 0)
        return res.status(404).json({ error: "No encontrado" });

      return res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async getArrayStates(req, res) {
    try {
      const data = await mCountry.getArrayStates();
      res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async getAllMunicipalities(req, res) {
    try {
      let data = await mCountry.getAllMunucipalities();
      res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async getMunicipality(req, res) {
    let name = req.params.stateName;
      
    name = Helper.capitalizeName(name);
    console.log(name)
    
    try {
      let data = await mCountry.getMunicipality(name);

      if (!data) return res.status(404).json({ error: "No encontrado" });

      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getDistricts(req, res) {
    let { stateName, municipalityName } = req.params;

    stateName = Helper.capitalizeName(stateName);
    municipalityName = Helper.capitalizeName(municipalityName);

    console.log(stateName, "asdas", municipalityName)
    
    try {
      let data = await mCountry.getDistrict(stateName, municipalityName);
      res.json(data);
    } catch (err) {
      if (err.message === "res is not defined")
        return res.status(404).json({ error: "No encontrado" });

      res.status(400).json({ error: err.message });
    }
  }

  static async create(req, res) {
    let data = req.body;
    try {
      const newData = await mCountry.create(data);
      return res.json(newData);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  static async update(req, res) {}

  static async delete(req, res) {}
}
