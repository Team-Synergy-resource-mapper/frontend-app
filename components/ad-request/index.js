import Sidebar from "./common/Sidebar";
import Header11 from "@/components/header/header-11";
import SettingsTabs from "./components/index";
import Footer from "./common/Footer";

const index = () => {
  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header11 />
      {/* End dashboard-header */}

      <section className="pt-40 pb-40 bg-light-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
            <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600">Create Ad</h1>
                <div className="text-15 text-light-1">
                  Find the best buyer for your product
                </div>
              </div>
              {/* End .col-12 */}
            </div>
              {/* End text-center */}
              <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <SettingsTabs />
              </div>
              <Footer />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>
      {/* End dashbaord content */}
    </>
  );
};

export default index;
