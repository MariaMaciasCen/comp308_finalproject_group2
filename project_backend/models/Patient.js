const { Schema, model } = require("mongoose");

const patientSchema = new Schema({
    pulse_rate: {
        type: String,
    },
    blood_pressure: {
        type: String,
    },
    weight: {
        type: String,
    },
    temperature: {
        type: String,
    },
    respiratory_rate: {
        type: String,
    },
});

const Patient = model("Patient", patientSchema);

module.exports = Patient;