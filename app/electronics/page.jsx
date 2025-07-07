'use client'
import CallToActions from "../../components/common/CallToActions";
import Header10 from "../../components/header/header-10";
import DefaultFooter from "../../components/footer/default";
import MainFilterSearchBox from "../../components/hotel-list/hotel-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "../../components/hotel-list/hotel-list-v1/TopHeaderFilter";
import HotelProperties from "../../components/properties/Properties";
import Pagination from "../../components/hotel-list/common/Pagination";
import eSidebar from "../../components/properties/Sidebar";
import Sidebar from "./sidebar/electronic_sidebar"
import { useState } from "react";

const index = () => {

  const electronicsData = [
    { id: 1, label: "mobile phones & tablets", checked: false },
    { id: 2, label: "mobile phone accessories", checked: false },
    { id: 3, label: "electronic home appliances", checked: false },
    { id: 4, label: "computers", checked: false },
    { id: 5, label: "computer accessories", checked: false },
    { id: 6, label: "cameras & camcorders", checked: false },
    { id: 7, label: "audio & mp3", checked: false },
    { id: 8, label: "air conditions & electrical fittings", checked: false }
  ];

  const [subData, setSubData] = useState(electronicsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [noPages, setNoPages] = useState(1);
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
                <Sidebar subData={subData} setSubData={setSubData} />
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
                    <Sidebar subData={subData} setSubData={setSubData} />
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
                <HotelProperties category={'electronics'} currentPage={currentPage} setNoPages={setNoPages} subData={subData.find(item => item.checked)?.label} />
              </div>
              {/* End .row */}
              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={noPages}/>
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End layout for listing sidebar and content */}
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
