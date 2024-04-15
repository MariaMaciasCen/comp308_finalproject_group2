const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VitalSign = require("../models/VitalSign");
//const { v4: uuidv4 } = require('uuid');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} = require("graphql");

const VitalSignsType = new GraphQLObjectType({
  name: "VitalSigns",
  description: "This represents the vital signs of a user",
  fields: () => ({
    temperature: { type: GraphQLFloat },
    heartRate: { type: GraphQLInt },
    bloodPressure: { type: GraphQLString },
    respiratoryRate: { type: GraphQLInt },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user in the app",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLNonNull(GraphQLString) },
    vitalSigns: { type: new GraphQLList(VitalSignsType) },
  }),
});

const UserLoginType = new GraphQLObjectType({
  name: "UserLogin",
  description: "This represents a user login in the app",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    token: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const UserDeleteType = new GraphQLObjectType({
  name: "Success",
  description: "This represents the result of deleting an user",
  fields: () => ({
    success: { type: GraphQLNonNull(GraphQLBoolean) },
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
        password: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },
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
    UpdateVitalSigns: {
      type: UserType,
      description: "Update vital signs for a user",
      args: {
        userId: { type: GraphQLNonNull(GraphQLString) },
        //id: { type: GraphQLNonNull(GraphQLString) },
        temperature: { type: GraphQLFloat },
        heartRate: { type: GraphQLFloat },
        bloodPressure: { type: GraphQLString },
        respiratoryRate: { type: GraphQLFloat },
      },
      resolve: async (parent, args) => {
        // Extract arguments from the mutation input
        const { userId, 
          //id,
          temperature, heartRate, bloodPressure, respiratoryRate } = args;
    
        try {
          // Capture the current date and time
          const currentDate = new Date();
          const date = currentDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
          const time = currentDate.toTimeString().split(' ')[0]; // Format the time as HH:MM:SS
    
          // Create a new instance of VitalSign model with the vital sign data
          const newVitalSign = new VitalSign({
            userId,
            //id: id || uuidv4(), // Use the provided ID or generate a new one
            date,
            time,
            temperature,
            heartRate,
            bloodPressure,
            respiratoryRate,
          });
          
          // Save the new vital sign entry to the vitalSign table
          await newVitalSign.save();
    
          // Return the user document (no need to modify it since we're saving to a separate collection)
          return User.findById(userId);
        } catch (error) {
          console.error("Error updating vital signs:", error);
          throw new Error("Failed to update vital signs.");
        }
      },
    },
    EditUser: {
      type: UserType,
      description: "Edit an User by Id",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },
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
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const result = await User.findByIdAndDelete(args.id);
        if (!result) {
          return { success: false };
        }
        return { success: true };
      },
    },
  }),
});

module.exports = { UserMutationType, UserQueryType, UserType };
