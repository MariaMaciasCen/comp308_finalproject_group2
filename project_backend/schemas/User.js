const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");
const Patient = require("../models/Patient");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user in the app",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserLoginType = new GraphQLObjectType({
  name: "UserLogin",
  description: "This represents a user login in the app",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const UserDeleteType = new GraphQLObjectType({
  name: "Success",
  description: "This represents the result of deleting an user",
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

const PatientDeleteType = new GraphQLObjectType({
  name: "DeletePatientInfo",
  description: "This represents the result of deleting an patient",
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});
const PatientType = new GraphQLObjectType({
  name: "Patient",
  description: "This represents a patient in the app",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    pulse_rate: { type: GraphQLString },
    blood_pressure: { type: GraphQLString },
    weight: { type: GraphQLString },
    temperature: { type: GraphQLString },
    respiratory_rate: { type: GraphQLString },
  }),
});

const UserQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    User: {
      type: UserType,
      description: "A Single User",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const user = await User.findById(args._id);
        return user;
      },
    },
    Users: {
      type: new GraphQLList(UserType),
      description: "List of All Users",
      resolve: async () => {
        const users = await User.find();
        return users;
      },
    },
    Login: {
      type: UserLoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      description: "List of All Users",
      resolve: async (parent, args) => {
        try {
          const { email, password } = args;
          const user = await User.findOne({ email: email });

          if (!user) {
            throw new Error("Wrong Username or Password.");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Wrong Username or Password.");
          }

          const payload = { id: user._id, email: user.email };
          jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 36000 },
              (err, token) => {
                if (err) {
                  throw new Error(err);
                }
                return {
                  ...payload,
                  token: token,
                };
              }
          );
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      },
    },
  }),
});

const UserMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    AddUser: {
      type: UserType,
      description: "Add a User",
      args: {
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const AddUser = new User({
          email: args.email,
          password: args.password,
          role: args.role,
        });
        const newUser = await AddUser.save();
        return newUser;
      },
    },

    EditUser: {
      type: UserType,
      description: "Edit an User by Id",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const EditUser = User.findByIdAndUpdate(
            args.id,
            {
              email: args.email,
              password: args.password,
              role: args.role,
            },
            { new: true }
        );
        return EditUser;
      },
    },

    DeleteUser: {
      type: UserDeleteType,
      description: "Delete an User by Id",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const result = await User.findByIdAndDelete(args.id);
        if (!result) {
          return { success: false };
        }
        return { success: true };
      },
    },
    
    //Patient
    AddPatientInfo: {
      type: PatientType,
      description: "Add a Patient",
      args: {
        pulse_rate: { type: GraphQLString },
        blood_pressure: { type: GraphQLString },
        weight: { type: GraphQLString },
        temperature: { type: GraphQLString },
        respiratory_rate: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const newPatient = new Patient({
          pulse_rate: args.pulse_rate,
          blood_pressure: args.blood_pressure,
          weight: args.weight,
          temperature: args.temperature,
          respiratory_rate: args.respiratory_rate,
        });
        return await newPatient.save();
      },
    },
    EditPatientInfo: {
      type: PatientType,
      description: "Edit a Patient by Id",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        pulse_rate: { type: GraphQLString },
        blood_pressure: { type: GraphQLString },
        weight: { type: GraphQLString },
        temperature: { type: GraphQLString },
        respiratory_rate: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const updatedPatient = await Patient.findByIdAndUpdate(
            args.id,
            {
              pulse_rate: args.pulse_rate,
              blood_pressure: args.blood_pressure,
              weight: args.weight,
              temperature: args.temperature,
              respiratory_rate: args.respiratory_rate,
            },
            { new: true }
        );
        if (!updatedPatient) {
          throw new Error("Patient not found");
        }
        return updatedPatient;
      },
    },
    DeletePatientInfo: {
      type: PatientDeleteType,
      description: "Delete a Patient by Id",
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const result = await Patient.findByIdAndDelete(args.id);
        if (!result) {
          return { success: false };
        }
        return { success: true };
      },
    },
  }),
});

module.exports = { UserMutationType, UserQueryType, UserType };