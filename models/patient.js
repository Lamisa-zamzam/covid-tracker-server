const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    PatientNumber: String,
    StatePatientNumber: String,
    DateAnnounced: String,
    EstimatedOnsetDate: String,
    AgeBracket: String,
    Gender: String,
    DetectedCity: String,
    DetectedDistrict: String,
    DetectedState: String,
    StateCode: String,
    CurrentStatus: String,
    Notes: String,
    ContractedFromWhichPatientSuspected: String,
    Nationality: String,
    TypeOfTransmission: String,
    StatusChangeDate: String,
    Source_1: String,
    Source_2: String,
    Source_3: String,
    BackupNotes: String,
    NumCases: Number,
});

module.exports = mongoose.model("Patient", patientSchema);
