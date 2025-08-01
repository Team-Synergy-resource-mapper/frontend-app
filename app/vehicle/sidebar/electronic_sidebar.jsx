
import SearchBox from "./search_box";
import CategoryFilter from "./electronic_category_filter";
import DealsFilter from "./DealsFilter";

const Sidebar = ({subData, setSubData}) => {
  return (
    <>
      <div className="sidebar__item -no-border">
        <h5 className="text-18 fw-500 mb-10">Search by property name</h5>
        <SearchBox />
      </div>
      {/* End search box */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Categories</h5>
        <div className="sidebar-checkbox">
          <CategoryFilter />
        </div>
      </div> */}

      
      {/* End popular filter */}

      <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Sub Categories</h5>
        <div className="sidebar-checkbox">
          <div className="row y-gap-5 items-center">
            <DealsFilter subData={subData} setSubData={setSubData}/>
          </div>
        </div>
      </div>
      {/* End deals filter */}

      

      {/* <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Nightly Price</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
      </div> */}
      {/* End Nightly priceslider */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Aminities</h5>
        <div className="sidebar-checkbox">
          <AminitesFilter />
        </div>
      </div> */}
      {/* End Aminities filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Star Rating</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <RatingsFilter />
        </div>
      </div> */}
      {/* End rating filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Guest Rating</h5>
        <div className="sidebar-checkbox">
          <GuestRatingFilters />
        </div>
      </div> */}
      {/* End Guest Rating */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Style</h5>
        <div className="sidebar-checkbox">
          <StyleFilter />
        </div>
      </div> */}
      {/* End style filter */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Neighborhood</h5>
        <div className="sidebar-checkbox">
          <NeighborhoddFilter />
        </div>
      </div> */}
      {/* End Aminities filter */}
    </>
  );
};

export default Sidebar;
