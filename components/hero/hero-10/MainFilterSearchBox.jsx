"use client";
import DateSearch from "../DateSearch";
import GuestSearch from "./GuestSearch";
import FlyingFromLocation from "./FlyingFromLocation";
import FlyingToLocation from "./FlyingToLocation";
import { useRouter } from "next/navigation";

const MainFilterSearchBox = () => {
  const Router = useRouter();
  return (
    <>
      <div className="mainSearch -col-4 -w-1070 bg-white shadow-1 rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
        <div className="button-grid items-center">
          <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar ">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Search</h4>
              <input placeholder="i want to buy a house"></input>
            </div>
          </div>
          <div className="button-item">
            <button
              className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-dark-1 text-white"
              onClick={() => Router.push("/properties")}
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      {/* End .mainSearch */}
    </>
  );
};

export default MainFilterSearchBox;
