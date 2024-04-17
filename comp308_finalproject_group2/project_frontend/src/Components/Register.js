import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation AddUser($email: String!, $password: String!, $role: String!) {
    AddUser(email: $email, password: $password, role: $role) {
      _id
      email
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [createRegister] = useMutation(REGISTER_MUTATION);

  const [error, setError] = useState(null);

  const onRegister = () => {
    createRegister({
      variables: registerForm,
      onCompleted(data) {
        navigate("/login");
      },
      onError(data) {
        setError(data.message);
      },
    });
  };
  return (
    <section class="h-100 gradient-form" style={{ "background-color": "#eee" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-xl-10">
            <div class="card rounded-3 text-black">
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="card-body p-md-5 mx-md-4">
                    <div class="text-center">
                      <img
                        src="/medical clinics.png"
                        style={{ width: "185px" }}
                        alt="logo"
                      />
                      <h4 class="mt-1 mb-5 pb-1">
                        Register to access your health data and stay connected
                        with your medical team.
                      </h4>
                      {error && (
                        <div class="text-center text-danger">{error}</div>
                      )}
                    </div>

                    <form>
                      <p>Please Add your Account Information</p>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          class="form-control"
                          placeholder="email address"
                          value={registerForm.email}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              email: e.target.value,
                            })
                          }
                        />
                        <label class="form-label" for="form2Example11">
                          Username
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example22"
                          class="form-control"
                          value={registerForm.password}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              password: e.target.value,
                            })
                          }
                        />
                        <label class="form-label" for="form2Example22">
                          Password
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <select
                          class="form-control"
                          name="roles"
                          id="role-select"
                          value={registerForm.role}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              role: e.target.value,
                            })
                          }>
                          <option value="">--Please choose an option--</option>
                          <option value="nurse">Nurse</option>
                          <option value="patient">Patient</option>
                        </select>
                        <label class="form-label" for="form2Example22">
                          Role
                        </label>
                      </div>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button
                          class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={() => onRegister()}>
                          Register
                        </button>
                      </div>

                      <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Already have an account?</p>
                        <a
                          href="/login"
                          type="button"
                          class="btn btn-outline-danger">
                          Log In
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center">
                  <img
                    src="/happy_doctors.jpg"
                    style={{ width: "80%" }}
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
