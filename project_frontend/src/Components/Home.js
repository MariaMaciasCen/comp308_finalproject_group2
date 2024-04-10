import React from "react";

const Home = () => {
  return (
    <section class="h-100 gradient-form" style={{ "background-color": "#eee" }}>
      <div class="jumbotron">
        <div class="container">
          <h1 class="text-center pt-5">Welcome to Health Sync</h1>
          <h5 class="text-center w-50 m-auto py-5">
            Monitor your health metrics, such as vital signs, medications, and
            fitness activities, to gain insights into your well-being and track
            progress over time.
          </h5>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <img
                class="card-img-top"
                src="./nurse.png"
                alt="Card image cap"
                height={280}
              />
              <div class="card-body">
                <p class="card-text">
                  Health Sync streamlines your workflow by providing easy access
                  to patient medical records and enabling secure communication
                  with patients. With our platform, you can efficiently review
                  patient histories, track vital signs, and manage
                  appointments—all within one intuitive interface.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary">
                      View More
                    </button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <img
                class="card-img-top"
                src="./patient.jpg"
                alt="Card image cap"
                height={280}
              />
              <div class="card-body">
                <p class="card-text">
                  Health Sync empowers you to take control of your health
                  journey by providing a centralized platform to manage your
                  medical records, track wellness metrics, and communicate with
                  healthcare professionals. Easily access your medication
                  schedules, receive reminders, and stay informed about your
                  treatment plans.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary">
                      View More
                    </button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <img
                class="card-img-top"
                src="./medication.jpg"
                alt="Card image cap"
                height={280}
              />
              <div class="card-body">
                <p class="card-text">
                  Health Sync simplifies medication management by organizing
                  your prescriptions, dosage instructions, and refill reminders
                  in one convenient location. With our intuitive interface, you
                  can easily view and update your medication schedule, reducing
                  the risk of missed doses or medication errors.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary">
                      View More
                    </button>
                  </div>
                  <small class="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
