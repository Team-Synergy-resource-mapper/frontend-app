
"use client"


const categoriesFilter = () => {

    const categoryData = [
        {id:1,label:"washing",checked:false}
    ]

  const handleCheckboxChange = (id) => {
    console.log(id)
  };

  return (
    <>
      {categoryData.map((filter) => (
          <div
            key={filter.id}
            className="row y-gap-10 items-center justify-between"
          >
            <div className="col-auto">
              <div className="form-checkbox d-flex items-center">
                <input type="checkbox" onChange={()=>handleCheckboxChange(filter.id)} checked={filter.checked}/>
                <div className="form-checkbox__mark">
                  <div className="form-checkbox__icon icon-check" />
                </div>
                <div className="text-15 ml-10">{filter.label}</div>
              </div>
            </div>
            {/* <div className="col-auto">
              <div className="text-15 text-light-1">{filter.count}</div>
            </div> */}
          </div>
      ))}
    </>
  );
};

export default categoriesFilter;
