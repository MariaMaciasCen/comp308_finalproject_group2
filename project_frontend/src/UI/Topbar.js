import React from "react";

const Topbar = () => {
  return (
    <section>
      <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div class="text-white mb-3 mb-md-0">HEALTH SYNC</div>
        <div class="d-flex flex-column column-gap-3 flex-md-row text-center text-md-start justify-content-between bg-primary">
          <a href="/login" class="text-white">
            LOGIN
          </a>
          <a href="/register" class="text-white">
            REGISTER
          </a>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
