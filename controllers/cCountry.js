import { mCountry } from "../models/mCountry.js";
import { Helper } from "../middlewares/helper.js";
import { ErrorHandler } from "../middlewares/eHandler.js";

export class cCountry {
  static async getAll(req, res) {
    try {
      const data = await mCountry.getAllStates();

      if (!data || data.length === 0) {
        return ErrorHandler.error404(err, req, res);
      }

      res.json(data);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  static async getState(req, res) {
    let name = req.params.stateName;

    name = Helper.capitalizeName(name);

    try {
      let data = await mCountry.getState(name);

      if (data.length === 0 || !data)
        return ErrorHandler.error404(err, req, res);

      return res.json(data);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  static async getArrayStates(req, res) {
    try {
      const data = await mCountry.getArrayStates();

      if (!data || data.length === 0) {
        return ErrorHandler.error404(err, req, res);
      }

      res.json(data);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  static async getAllMunicipalities(req, res) {
    try {
      let data = await mCountry.getAllMunucipalities();

      if (!data || data.length === 0) {
        return ErrorHandler.error404(err, req, res);
      }

      res.json(data);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  static async getMunicipality(req, res) {
    let name = req.params.stateName;

    name = Helper.capitalizeName(name);

    try {
      let data = await mCountry.getMunicipality(name);

      if (!data || data.length === 0)
        return ErrorHandler.error404(err, req, res);

      res.json(data);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  static async getDistricts(req, res) {
    let { stateName, municipalityName } = req.params;

    stateName = Helper.capitalizeName(stateName);
    municipalityName = Helper.capitalizeName(municipalityName);

    try {
      let data = await mCountry.getDistrict(stateName, municipalityName);

      if (!data || data.length === 0)
        return ErrorHandler.error404(err, req, res);

      res.json(data);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
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
