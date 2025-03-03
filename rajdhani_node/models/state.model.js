
const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  id: { type: Number,  unique: true },
  name: { type: String, },
  country_id: { type: Number,  },
  country_code: { type: String, },
  country_name: { type: String,  },
  state_code: { type: String,  },
  type: { type: String,  },
  latitude: { type: String,  },
  longitude: { type: String,  }
});

const States = mongoose.model("State", stateSchema);

module.exports.States = States;
