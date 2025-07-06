import CallToActions from "../../components/common/CallToActions";
import Header10 from "../../components/header/header-10";
import DefaultFooter from "../../components/footer/default";
import MainFilterSearchBox from "../../components/hotel-list/hotel-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "../../components/hotel-list/hotel-list-v1/TopHeaderFilter";
import HotelProperties from "../../components/properties/Properties";
import Pagination from "../../components/hotel-list/common/Pagination";
import Sidebar from "../../components/properties/Sidebar";

export const metadata = {
  title: "Hotel List v1 || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const index = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header10 />
      {/* End Header 1 */}

     

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              {/* End mt--30 */}
              <div className="row y-gap-30">
                <HotelProperties />
              </div>
              {/* End .row */}
              <Pagination />
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}
      hello
      <img src="https://i.ikman-st.com/konka-43-inch-led-tv-full-hd-for-sale-colombo-1/80b309a1-59a0-4e1e-b339-7cd2e3e6e14c/620/466/fitted.jpg,https://i.ikman-st.com/konka-43-inch-led-tv-full-hd-for-sale-colombo-1/80b309a1-59a0-4e1e-b339-7cd2e3e6e14c/100/70/cropped.jpg" alt="TV Image"></img>
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
