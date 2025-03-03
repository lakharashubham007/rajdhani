const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: { type: String },
  iso3: { type: String },
  iso2: { type: String },
  numeric_code: { type: String },
  phone_code: { type: String },
  capital: { type: String },
  currency: { type: String },
  currency_name: { type: String },
  currency_symbol: { type: String },
  tld: { type: String },
  native: { type: String },
  region: { type: String },
  region_id: { type: String },
  subregion: { type: String },
  subregion_id: { type: String },
  nationality: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  emoji: { type: String },
  emojiU: { type: String }
});

const Country = mongoose.model("Country", countrySchema);

module.exports.Country = Country;
