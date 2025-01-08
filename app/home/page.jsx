import dynamic from "next/dynamic";
import Header10 from "../../components/header/header-10";
import Hero10 from "../../components/hero/hero-10";
import Link from "next/link";
import Footer8 from "../../components/footer/footer-8";
import BlockGuide from "../../components/block/BlockGuide";
import AppBanner from "../../components/home/home-10/AppBanner";
import TopDestinations from "../../components/home/home-10/TopDestinations";
import TestimonialRating from "../../components/home/home-10/TestimonialRating";
import Testimonial from "../../components/home/home-10/Testimonial";
import PopularRoutes from "../../components/home/home-10/PopularRoutes";
import Locations from "../../components/home/home-10/Locations";

export const metadata = {
  title: "Synergy",
  description: "Synergy - Resource allocator mapper for efficient transaction",
};

const home_10 = () => {
  return (
    <>
      {/* End Page Title */}

      <Header10 />
      {/* End Header 5 */}

      <Hero10 />
      {/* End Hero 5 */}
      
      {/* End Tours Categories */}

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Explore Main Categories</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                href="/properties"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40 sm:pt-20">
            <Locations />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Explore Hot Locations */}



      {/* why we choose us */}
      <section className="layout-pt-sm layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Why Choose Us</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular Goods have a lot to offer
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <BlockGuide />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>


      {/* Why choose Block Guide Section */}

      {/* Popular Routes Sections */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Top Sellings</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular items have a lot to offer
                </p>
              </div>
            </div>
            {/* End col-auto */}

            <div className="col-auto">
              <Link
                href="/properties"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}

          <div className="relative mt-40 sm:mt-20 js-section-slider">
            <TopDestinations />
          </div>
          {/* End slider  */}
        </div>
        {/* End .container */}
      </section>
      {/* End .Top Destinations */}

      <section className="layout-pt-lg layout-pb-lg bg-dark-3">
        <div className="container">
          <div className="row y-gap-40 justify-between text-white">
            <div className="col-xl-5 col-lg-6">
              <TestimonialRating />
            </div>
            {/* End .col */}

            <div className="col-lg-6">
              <Testimonial />
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End testimonial and brand sections Section */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row justify-between items-end">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Popular Explore items</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  These popular items have a lot to offer
                </p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                href="/properties"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
          </div>
          {/* End .row */}

          <div className="relative mt-40 sm:mt-20">
            <PopularRoutes />
          </div>
          {/* End relative */}
        </div>
        {/* End .container */}
      </section>
      {/* End popular routes Section */}

      <AppBanner />
      {/* App Banner Section */}

      <Footer8 />
      {/* End Footer Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(home_10), { ssr: false });
