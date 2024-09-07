import { mCountry } from "../models/mCountry.js";
import { Helper } from "../middlewares/helper.js";
import { ErrorHandler } from "../middlewares/eHandler.js";

export class cCountry {
  //? Obtener todos los estados
  static async getAll(req, res) {
    try {
      const data = await mCountry.getAllStates();

      if (!data || data.length === 0) {
        return ErrorHandler.error404(err, req, res);
      } else {
        return res.json(data);
      }
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //? Obtener un estado
  static async getState(req, res) {
    let name = req.params.stateName;

    name = Helper.capitalizeName(name);

    try {
      let data = await mCountry.getState(name);

      if (data.length === 0) {
        ErrorHandler.error404(req, res);
      } else {
        res.json(data);
        console.log(data.length);
      }
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //? Obtener un array de todos los estados
  static async getArrayStates(req, res) {
    try {
      const data = await mCountry.getArrayStates();

      if (!data || data.length === 0) {
        return ErrorHandler.error404(err, req, res);
      } else {
        return res.json(data);
      }
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //? Obtener un array de todos los municipios
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

  //? Obtener una lista municipios de un estado
  static async getMunicipality(req, res) {
    let name = req.params.stateName;

    name = Helper.capitalizeName(name);

    try {
      let data = await mCountry.getMunicipality(name);

      if (!data || data.length === 0) ErrorHandler.error404(req, res);
      else {
        res.json(data);
      }
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //? Obtener un array de las parroquias determinadas
  static async getDistricts(req, res) {
    let { stateName, municipalityName } = req.params;

    stateName = Helper.capitalizeName(stateName);
    municipalityName = Helper.capitalizeName(municipalityName);

    try {
      let data = await mCountry.getState(stateName);

      if (!data || data.length === 0) {
        ErrorHandler.error404(req, res);
      } else {
        let muni = data[0].municipios.find(
          (el) => el.municipio === municipalityName
        );
        if (!muni || muni.length === 0) ErrorHandler.error404(req, res);
        else {
          res.json(muni.parroquias);
        }
      }
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //* Agregar nuevo estado
  static async create(req, res) {
    let data = req.body;
    try {
      const newData = await mCountry.create(data);
      return res.json(newData);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  //* Agregar un nuevo municipio
  static async createMunicipality(req, res) {
    let data = req.body;
    let { stateName } = req.params;
    let nombre = Helper.capitalizeName(stateName);
    try {
      const newData = await mCountry.createMunicipality(nombre, data);
      res.json(newData);
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //* Actualizar estado completo
  static async update(req, res) {
    let data = req.body;
    let { id } = req.params;

    try {
      let updatedState = await mCountry.updatedState;
      return updatedState;
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }

  //! Eliminar un estado
  static async delete(req, res) {
    let { id } = req.params;
    try {
      let response = await mCountry.deleteState(id);
      res.json({ ok: "Dato Eliminado" });
    } catch (err) {
      ErrorHandler.error500(err, req, res);
    }
  }
}
