"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "../../store/reducers/data/subCategoryReducer";

const CategorySelector = ({ name, formik, category }) => {
  // store
  const dispatch = useDispatch();
  const { subCategories, isLoading } = useSelector(
    (state) => state.subCategory
  );
  // manage states
  const [options, setOptions] = useState([]);

  // data prefetching
  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);

  // data pre-processing
  // useEffect(()=>{
  //   if(subCategories){
  //     const transformData = subCategories.map(category=>{return category.label});
  //     setOptions(transformData);
  //   }
  // },[subCategories])

  // handle events
  const handleItemClick = (option) => {
    formik.setFieldValue(name, option);
  };

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }
  return (
    <div className="row x-gap-100 y-gap-15">
      <div className="col-12">
        <div className="text-18 fw-500">Property Type</div>
      </div>
      {/* End .col-12 */}

      {subCategories.map((subC) => {
        return (
          formik.values[category] === subC.mainCategoryId && (
            <div key={subC.id} className="col-lg-3 col-sm-6">
              <div className="row y-gap-15">
                <div className="col-12">
                  <div className="d-flex items-center form-checkbox">
                    <input
                      type="checkbox"
                      name={name}
                      checked={formik.values.subCategory === subC.id}
                      onChange={()=>handleItemClick(subC.label)}
                    />
                    <div className="form-checkbox__mark">
                      <div className="form-checkbox__icon icon-check" />
                    </div>
                    <div className="text-15 lh-11 ml-10">{subC.label}</div>
                  </div>
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}
            </div>
          )
        );
      })}
    </div>
  );
};

export default CategorySelector;
