import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
  query Login($email: String, $password: String) {
    Login(email: $email, password: $password) {
      _id
      email
      token
      password
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [getLogin] = useLazyQuery(LOGIN);

  const onLogin = () => {
    getLogin({
      variables: loginForm,
      onCompleted(data) {
        navigate("/enter-vital-signs");
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
                        Sign in to access your health data and stay connected
                        with your medical team.
                      </h4>
                      {error && (
                        <div class="text-center text-danger">{error}</div>
                      )}
                    </div>

                    <form>
                      <p>Please login to your account</p>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example11"
                          class="form-control"
                          placeholder="email address"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
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
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                        />
                        <label class="form-label" for="form2Example22">
                          Password
                        </label>
                      </div>

                      <div class="text-center pt-1 mb-5 pb-1">
                        <button
                          class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={() => onLogin()}>
                          Log in
                        </button>
                      </div>

                      <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Don't have an account?</p>
                        <a
                          href="/register"
                          type="button"
                          class="btn btn-outline-danger">
                          Create new
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

export default Login;
