const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: Number,  unique: true },
  name: { type: String,  },
  state_id: { type: Number,  },
  state_code: { type: String, },
  state_name: { type: String, },
  country_id: { type: Number,  },
  country_code: { type: String,  },
  country_name: { type: String,  },
  latitude: { type: String, },
  longitude: { type: String,  },
  wikiDataId: { type: String }
});

const City = mongoose.model("City", citySchema);

module.exports.City = City;
