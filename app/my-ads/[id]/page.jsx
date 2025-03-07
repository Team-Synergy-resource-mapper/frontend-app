import dynamic from "next/dynamic";
import "photoswipe/dist/photoswipe.css";
import toursData from "@/data/tours";
import Header11 from "@/components/header/header-11";
import TopBreadCrumb from "@/components/tour-single/TopBreadCrumb";
import ReviewProgress2 from "@/components/tour-single/guest-reviews/ReviewProgress2";
import DetailsReview2 from "@/components/tour-single/guest-reviews/DetailsReview2";
import ReplyForm from "@/components/tour-single/ReplyForm";
import ReplyFormReview2 from "@/components/tour-single/ReplyFormReview2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import Tours from "@/components/tours/Tours";
import Faq from "@/components/faq/Faq";
import Link from "next/link";
import Itinerary from "@/components/tour-single/itinerary";
import ImportantInfo from "@/components/tour-single/ImportantInfo";
import TourGallery from "@/components/myad-single/TourGallery";

export const metadata = {
  title: "Tour Single || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const TourSingleV1Dynamic = ({ params }) => {
  const id = params.id;
  const tour = toursData.find((item) => item.id == id) || toursData[0];

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}


      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <h1 className="text-30 fw-600">{tour?.title}</h1>
              <div className="row x-gap-20 y-gap-20 items-center pt-10">
                <div className="col-auto">
                  <div className="d-flex items-center">
                  

                    <div className="text-14 text-light-1 ml-10">
                      {tour?.numberOfReviews} views
                    </div>
                  </div>
                </div>

                <div className="col-auto">
                  <div className="row x-gap-10 items-center">
                    <div className="col-auto">
                      <div className="d-flex x-gap-5 items-center">
                        <i className="icon-placeholder text-16 text-light-1"></i>
                        <div className="text-15 text-light-1">
                          {tour?.location}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-10 y-gap-10">
                <div className="col-auto">
                  <button className="button px-15 py-10 -blue-1">
                    <i className="icon-edit mr-10"></i>
                    Edit
                  </button>
                </div>

                <div className="col-auto">
                  <button className="button px-15 py-10 -blue-1 bg-light-2">
                    <i className="icon-trash mr-10"></i>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End gallery grid wrapper */}

      <TourGallery tour={tour} />

      {/* End single page content */}


      <section className="layout-pt-lg layout-pb-lg mt-50 border-top-light">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Most Popular Tours</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                href="#"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40 sm:pt-20 item_gap-x30">
            <Tours />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Tours Sections */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(TourSingleV1Dynamic), {
  ssr: false,
});
