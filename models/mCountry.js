import mongoose from "mongoose";
import countrySchema from "../schemas/sCountry.js";

const Country = mongoose.model("State", countrySchema);

export class mCountry extends Country {
  //? Obtener todos los estados
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

  //? Obtener un solo estado
  static async getState(name) {
    try {
      let data = await Country.find(
        { nombre_estado: name },
        { _id: 0, __v: 0, ["municipios._id"]: 0, ID: 0 }
      );
      return data;
    } catch (err) {
      throw { status: 500, error: err.message, message: "No encontrado" };
    }
  }

  //? Obtener un arrar de todos los estados
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

  //? Obtener un array de todos los municipios
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

  //? Obtener una lista municipios de un estado
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

  //* Agregar nuevo estado
  static async create(data) {
    try {
      let newState = new Country(data);
      await newState.save();
      return { ok: "Estado agregado" };
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  //* Agregar un nuevo municipio
  static async createMunicipality(nombre, data) {
    try {
      await Country.findOneAndUpdate(
        {
          nombre_estado: nombre,
        },
        { $push: { municipios: data } }
      );
      return { ok: "municipio agregado" };
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  //* Actualizar estado completo
  static async updateState(id, data) {
    try {
      await Country.findByIdAndUpdate(id, data);
      res.json({ ok: "objeto actualizado" });
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }

  //! Eliminar un estado
  static async deleteState(id) {
    try {
      let dataDeleted = await Country.findByIdAndDelete(id);
      return dataDeleted;
    } catch (err) {
      throw { status: 500, error: err.message };
    }
  }
}
