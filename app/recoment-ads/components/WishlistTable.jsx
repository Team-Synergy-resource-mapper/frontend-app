"use client";

import { useState} from "react";
import {useRouter } from "next/navigation";
import Pagination from "../common/Pagination";
import Properties from "./Properties";

const WishlistTable = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter()
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabItems = [
    "Adverticements",
    // "Tour",
    // "Activity",
    // "Holiday Rental",
    // "Cars",
    // "Cruiser",
  ];

  return (
    <>
      <div className="tabs -underline-2 js-tabs">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            {/* Tabs Section */}
            <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
              {tabItems.map((item, index) => (
                <div className="col-auto" key={index}>
                  <button
                    className={`tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button ${
                      activeTab === index ? "is-tab-el-active" : ""
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
            {/* Button Section */}
          </div>
        </div>

        <div className="tabs__content pt-30 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="row y-gap-20">
              <Properties id={id} />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default WishlistTable;
