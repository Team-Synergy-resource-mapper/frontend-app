'use client'
import React, { useEffect } from "react";
import Header10 from "../../components/header/header-10";
import SettingsTabs from "./components/index";
import Footer from "./common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, setRequest } from "../../store/reducers/data/adRequestReducer";
const index = ({id}) => {
    // store state
    const{requests, isLoading} = useSelector(state=>state.request);
    const dispatch = useDispatch();

    // choose exist request 
    useEffect(() => {
      const fetchAndSetRequest = async () => {
        if (!requests) {
          // Fetch requests if not already loaded
          await dispatch(fetchRequests());
        }
  
        // Find and set the request based on ID
        const matchedRequest = requests?.find((req) => req.id === id) || null;
        dispatch(setRequest(matchedRequest));
      };
  
      fetchAndSetRequest();
    }, [id, requests, dispatch]);
    
  
    // loading
    if(isLoading){
      return <h1>Loading ...</h1>
    }
  return (
    <>
      {/*  */}
      {/* End Page Title */}
      <div className="header-margin"></div>

      <Header10 />
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
                <SettingsTabs  />
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
