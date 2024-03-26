const Employee = require("../models/Employee");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  description: "This represents an employee to the app",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    salary: { type: GraphQLNonNull(GraphQLInt) },
    department: { type: GraphQLNonNull(GraphQLString) },
    hiringDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const EmployeeDeleteType = new GraphQLObjectType({
  name: "Success",
  description: "This represents the result of deleting an employee",
  fields: () => ({
    success: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
});

const EmployeeQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    Employee: {
      type: EmployeeType,
      description: "A Single Employee",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let employee;
        employee = await Employee.findById(args._id);
        return employee;
      },
    },
    Employees: {
      type: new GraphQLList(EmployeeType),
      description: "List of All Employeers",
      resolve: async () => {
        const employees = await Employee.find();
        return employees;
      },
    },
  }),
});

const EmployeeMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    AddEmployee: {
      type: EmployeeType,
      description: "Add a Employee",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        salary: { type: GraphQLNonNull(GraphQLInt) },
        department: { type: GraphQLNonNull(GraphQLString) },
        hiringDate: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const AddEmployee = new Employee({
          name: args.name,
          lastname: args.lastname,
          email: args.email,
          salary: args.salary,
          department: args.department,
          hiringDate: args.hiringDate,
        });
        const newEmployee = await AddEmployee.save();
        return newEmployee;
      },
    },

    EditEmployee: {
      type: EmployeeType,
      description: "Edit an Employee by Id",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        salary: { type: GraphQLNonNull(GraphQLInt) },
        department: { type: GraphQLNonNull(GraphQLString) },
        hiringDate: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const EditEmployee = Employee.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            lastname: args.lastname,
            email: args.email,
            salary: args.salary,
            department: args.department,
            hiringDate: args.hiringDate,
          },
          { new: true }
        );
        return EditEmployee;
      },
    },

    DeleteEmployee: {
      type: EmployeeDeleteType,
      description: "Delete an Employee by Id",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const result = await Employee.findByIdAndDelete(args.id);
        console.log(result);
        if (!result) {
          return { success: false };
        }
        return { success: true };
      },
    },
  }),
});

module.exports = { EmployeeMutationType, EmployeeQueryType, EmployeeType };
