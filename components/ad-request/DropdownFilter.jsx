
'use client'

import { fetchCategories } from "@/store/reducers/data/categoryReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DropdownFilter = () => {
  // store
  const dispatch = useDispatch();
  const { categories, error, isLoading, success } = useSelector((state) => state.category);
  // manage states
  const [selectedItem, setSelectedItem] = useState("Select Category");
  const [options, setOptions] = useState([]);
  
  // data prefetching
  useEffect(()=>{
      dispatch(fetchCategories())
  },[dispatch])

  // data pre-processing
  useEffect(()=>{
    if(categories){
      const transformData = categories.map(category=>{return category.label});
      setOptions(transformData);
    }
  },[categories])

  // handle events
  const handleItemClick = (event) => {
    setSelectedItem(event.target.textContent);
  };

  if(isLoading){
    return <h3>Loading ...</h3>
  }
  return (
    <div className="dropdown js-dropdown js-services-active">
      <div
        className="dropdown__button border d-flex items-center justify-between bg-white rounded-4 w-230 text-14 px-20 h-50 text-14"
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        aria-expanded="false"
        data-bs-offset="0,10"
      >
        <span className="js-dropdown-title">{selectedItem}</span>
        <i className="icon icon-chevron-sm-down text-7 ml-10" />
      </div>
      <div className="toggle-element -dropdown  dropdown-menu">
        <div className="text-14 y-gap-15 js-dropdown-list">
          {options.map((option, index) => (
            <div
              key={index}
              className={`${
                selectedItem === option ? "text-blue-1" : ""
              } js-dropdown-link`}
              onClick={handleItemClick}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;
