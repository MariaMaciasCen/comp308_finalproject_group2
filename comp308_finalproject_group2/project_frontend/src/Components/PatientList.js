import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_USERS = gql`
  query {
    Users {
      _id
      email
      role
    }
  }
`;

const PatientList = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewRecords = (patientId) => {
    navigate(`/patient/${patientId}/records`);
  };

  const patients = data.Users.filter((user) => user.role === "patient");

  return (
    <div className="patient-list-container">
      <h1>Patient List</h1>
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Records</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient._id}</td>
              <td>{patient.email}</td>
              <td>{patient.role}</td>
              <td>
                <button
                  className="view-records-button"
                  onClick={() => handleViewRecords(patient._id)}
                >
                  View Records
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;


