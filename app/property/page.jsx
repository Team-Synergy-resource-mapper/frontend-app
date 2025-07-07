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
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from "react";

const index = () => {

  const propertyData = [
    { id: 1, label: "room & annex", checked: false },
    { id: 2, label: "land", checked: false },
    { id: 3, label: "house", checked: false },
    { id: 4, label: "commercial property", checked: false },
    { id: 5, label: "apartment", checked: false }
  ];

  const [subData , setSubData] = useState(propertyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [noPages, setNoPages] = useState(1);
  const pages = 10;

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
                <Sidebar setSubData={setSubData} subData={subData} />
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
                    <Sidebar setSubData={setSubData} subData={subData} />
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
                <HotelProperties  category={'property'} currentPage={currentPage} setNoPages={setNoPages}  subData={subData.find(item => item.checked)?.label} />
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
      hello
      <img src="https://i.ikman-st.com/konka-43-inch-led-tv-full-hd-for-sale-colombo-1/80b309a1-59a0-4e1e-b339-7cd2e3e6e14c/620/466/fitted.jpg,https://i.ikman-st.com/konka-43-inch-led-tv-full-hd-for-sale-colombo-1/80b309a1-59a0-4e1e-b339-7cd2e3e6e14c/100/70/cropped.jpg" alt="TV Image"></img>
      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default index;
