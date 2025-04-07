const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    waterFrequency: { type: String, required: true },
    lightRequirement: { type: String, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Plant', plantSchema);
