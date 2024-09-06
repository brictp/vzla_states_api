import mongoose from "mongoose";
import countrySchema from "../schemas/sCountry.js";

const Country = mongoose.model("State", countrySchema);

export class mCountry extends Country {
  static async getAllStates() {
    try {
      let country = await Country.find(
        {},
        { _id: 0, __v: 0, ["municipios._id"]: 0, ID: 0 }
      );

      return country;
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async getState(name) {
    try {
      let data = await Country.find(
        { nombre_estado: name },
        { _id: 0, __v: 0, ["municipios._id"]: 0, ID: 0 }
      );

      return data;
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async getArrayStates() {
    try {
      let data = await Country.find({}, { nombre_estado: 1, _id: 0 });

      const arrTotal = [];
      data.map((el) => arrTotal.push(el.nombre_estado));

      return arrTotal;
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async getAllMunucipalities() {
    try {
      let data = await Country.find(
        {},
        { ["municipios.municipio"]: 1, _id: 0 }
      );

      const arrTotal = [];

      data.map((el) => arrTotal.push(el.municipios.map((e) => e.municipio)));

      return arrTotal;
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async getMunicipality(name) {
    try {
      let municipality = await Country.find(
        { nombre_estado: name },
        { ["municipios.municipio"]: 1, _id: 0 }
      );

      let arrtotal = municipality.map((el) =>
        el.municipios.map((e) => e.municipio)
      );
      return arrtotal[0];
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async getDistrict(stateName, municipalityName) {
    try {
      let state = await this.getState(stateName);

      let muni = state[0].municipios.find(
        (el) => el.municipio === municipalityName
      );

      return muni.parroquias;
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }
  static async create(data) {
    try {
      let newState = new Country(data);
      await newState.save();
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async update(id, data) {
    try {
      await Country.findByIdAndUpdate(id, data);
      res.json({ ok: "objeto actualizado" });
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  static async delete(req, res) {
    let id = req.params.id;
    try {
      await Country.findOneAndDelete({ ID: id });
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }
}
