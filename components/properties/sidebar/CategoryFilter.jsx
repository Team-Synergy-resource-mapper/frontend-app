"use client"

import { fetchCategories } from "../../../store/reducers/data/categoryReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const categoriesFilter = () => {

  // store data
  const dispatch = useDispatch();
  const { categories, error, isLoading, success } = useSelector((state) => state.category);

  // states
  const[categoryData, setCategoryData] = useState([]);

  // categories preprocessing
  useEffect(()=>{
    if(categories){
      const transformData = categories.map((category,index)=>{
        return{
          index:index,
          label:category.label,
          count:category.count,
          checked:category.checked
        }
      })
      setCategoryData(transformData);
    }
  },[categories])

  // load initial category data
  useEffect(()=>{
    dispatch(fetchCategories())
  },[dispatch])


  const handleCheckboxChange = (index) => {
    console.log(index)
  };

  return (
    <>
      {categoryData.map((filter, index) => (
          <div
            key={index}
            className="row y-gap-10 items-center justify-between"
          >
            <div className="col-auto">
              <div className="form-checkbox d-flex items-center">
                <input type="checkbox" onChange={()=>handleCheckboxChange(index)} checked={filter.checked}/>
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
                <div className="text-15 ml-10">{filter.label}</div>
              </div>
            </div>
            <div className="col-auto">
              <div className="text-15 text-light-1">{filter.count}</div>
            </div>
          </div>
      ))}
    </>
  );
};

export default categoriesFilter;
