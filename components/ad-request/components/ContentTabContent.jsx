import HotelPolicy from "./content/HotelPolicy";
import BannerUploader from "./content/BannerUploader";
import FeaturedUploader from "./content/FeaturedUploader";
import GalleryUploader from "./content/GalleryUploader";
import DropdownFilter from "../DropdownFilter";

const ContentTabContent = () => {
  return (
    <>
      <div className="col-xl-10">
        <div className="text-18 fw-500 mb-10">Property Details</div>
        <div className="row x-gap-20 y-gap-20">
          <div className="col-12">
            <div className="form-input ">
              <input type="text" required />
              <label className="lh-1 text-16 text-light-1">Title</label>
            </div>
          </div>
          {/* End Name */}

          <div className="col-12">
            <div className="form-input ">
              <textarea required rows={5} defaultValue={""} />
              <label className="lh-1 text-16 text-light-1">Description</label>
            </div>
          </div>
          {/* End Content */}

          <div className="col-12">
            <div className="form-input ">
              <input type="text" required />
              <label className="lh-1 text-16 text-light-1">Price (LKR)</label>
            </div>
          </div>
          {/* End price */}
        </div>
        {/* End HotelContent */}

        <div className="mt-30">
          <div className="fw-500">Property Images</div>
          <BannerUploader />
        </div>
        {/* End ImageUploader */}

        <div className="mt-30">
          <div className="col-12">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="fw-500">Category</div>
                <DropdownFilter />
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="fw-500">Condition</div>
                <div className="form-input ">
                  <div className="d-flex items-center form-checkbox">
                    <input type="checkbox" name="name" />
                    <div className="form-checkbox__mark">
                      <div className="form-checkbox__icon icon-check" />
                    </div>
                    <div className="text-15 lh-11 ml-10">Used</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End category dropdown */}

        <div className="border-top-light mt-30 mb-30" />
        <div className="border-top-light mt-30 mb-30" />

        <div className="d-inline-block pt-30">
          <button className="button h-50 px-24 -dark-1 bg-blue-1 text-white">
            Save Changes <div className="icon-arrow-top-right ml-15" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ContentTabContent;
