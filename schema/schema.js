const graphql = require("graphql");
const _ = require("lodash");
const { ObjectID } = require("mongodb");
const Patient = require("../models/patient");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const PatientType = new GraphQLObjectType({
    name: "Patient",
    fields: () => ({
        id: { type: GraphQLID },
        PatientNumber: { type: GraphQLID },
        StatePatientNumber: { type: GraphQLString },
        DateAnnounced: { type: GraphQLString },
        EstimatedOnsetDate: { type: GraphQLString },
        AgeBracket: { type: GraphQLInt },
        Gender: { type: GraphQLString },
        DetectedCity: { type: GraphQLString },
        DetectedDistrict: { type: GraphQLString },
        DetectedState: { type: GraphQLString },
        StateCode: { type: GraphQLString },
        CurrentStatus: { type: GraphQLString },
        Notes: { type: GraphQLString },
        ContractedFromWhichPatientSuspected: { type: GraphQLString },
        Nationality: { type: GraphQLString },
        TypeOfTransmission: { type: GraphQLString },
        StatusChangeDate: { type: GraphQLString },
        Source_1: { type: GraphQLString },
        Source_2: { type: GraphQLString },
        Source_3: { type: GraphQLString },
        BackupNotes: { type: GraphQLString },
        NumCases: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        patient: {
            type: PatientType,
            args: { _id: { type: GraphQLString } },
            resolve(parent, args) {
                return Patient.findById({ _id: ObjectID(args._id) });
            },
        },
        patients: {
            type: new GraphQLList(PatientType),
            resolve(parent, args) {
                return Patient.find({}).limit(10);
            },
        },
        statusWiseCases: {
            type: new GraphQLList(PatientType),
            args: { CurrentStatus: { type: GraphQLString } },
            resolve(parent, args) {
                return Patient.find({
                    CurrentStatus: args.CurrentStatus,
                });
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPatient: {
            type: PatientType,
            args: {
                PatientNumber: { type: new GraphQLNonNull(GraphQLID) },
                StatePatientNumber: { type: GraphQLString },
                DateAnnounced: { type: GraphQLString },
                EstimatedOnsetDate: { type: GraphQLString },
                AgeBracket: { type: GraphQLString },
                Gender: { type: GraphQLString },
                DetectedCity: { type: GraphQLString },
                DetectedDistrict: { type: GraphQLString },
                DetectedState: { type: GraphQLString },
                StateCode: { type: GraphQLString },
                CurrentStatus: { type: GraphQLString },
                Notes: { type: GraphQLString },
                ContractedFromWhichPatientSuspected: { type: GraphQLString },
                Nationality: { type: GraphQLString },
                TypeOfTransmission: { type: GraphQLString },
                StatusChangeDate: { type: GraphQLString },
                Source_1: { type: GraphQLString },
                Source_2: { type: GraphQLString },
                Source_3: { type: GraphQLString },
                BackupNotes: { type: GraphQLString },
                NumCases: { type: GraphQLString },
            },
            resolve(parent, args) {
                let patient = new Patient({
                    ...args,
                });
                return patient.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
