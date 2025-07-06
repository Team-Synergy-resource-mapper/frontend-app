'use client'
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategories } from "@/store/reducers/data/subCategoryReducer";
import { useEffect, useState } from "react";
import { selectSubCategory } from "@/store/reducers/data/subCategoryReducer";
const DealsFilter = ({subData, setSubData}) => {
  


  
  // store
  const dispatch = useDispatch();
  const { subCategories, isLoading } = useSelector(
    (state) => state.subCategory
  );
  const { categories } = useSelector(
    (state) => state.category
  );
  const[data, setData] = useState([])

  // data prefetching
  useEffect(() => {
    dispatch(fetchSubCategories());
  }, [dispatch]);
  useEffect(() => {
    if (categories && subCategories) {
      console.log("hello")
      const selectedIds = categories
        .filter(item => item.checked) // Get checked items
        .map(item => item.id); // Extract IDs
      console.log(selectedIds)
      if(selectedIds.length > 0){
        const sub = subCategories.filter(item => selectedIds.includes(item.mainCategoryId));
        setData(sub);
      }else{setData([])}
    }

  }, [categories, dispatch, subCategories])

  const handleCheckboxChange = (id) => {
    const newData = subData.map(item=>{if (item.id === id){
      return {id:item.id, label:item.label, checked:true}
    }else{
      return {id:item.id, label:item.label, checked:false}
    }})
    setSubData(newData);
    console.log(id)
  };
  




  return (
    <>
      {subData.map((deal, index) => (
        <div
          key={index}
          className="row y-gap-10 items-center justify-between"
        >
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" onChange={() => handleCheckboxChange(deal.id)} checked={deal.checked} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{deal.label}</div>
            </div>
          </div>
          {/* <div className="col-auto">
            <div className="text-15 text-light-1">{deal.count}</div>
          </div> */}
        </div>

      ))}
    </>
  );
};

export default DealsFilter;
