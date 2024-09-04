import mongoose from "mongoose";

const municipalitySchema = mongoose.Schema({
  municipio: String,
  capital: String,
  parroquias: [],
})

const countrySchema = new mongoose.Schema({
  nombre_estado: String,
  capital_estado: String,
  ID: Number,
  municipios: [municipalitySchema],
})


export default countrySchema;