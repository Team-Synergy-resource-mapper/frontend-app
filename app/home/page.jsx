import dynamic from "next/dynamic";
import Header10 from "../../components/header/header-10";
import Hero10 from "../../components/hero/hero-10";
import Link from "next/link";
import Footer8 from "../../components/footer/footer-8";
import BlockGuide from "../../components/block/BlockGuide";
import MainCategories from "../../components/home/home-10/MainCategories";

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
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <Link
                href="/property"
                className="button -md -blue-1 bg-blue-1-05 text-blue-1"
              >
                More <div className="icon-arrow-top-right ml-15" />
              </Link>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <div className="row y-gap-30 pt-40 sm:pt-20">
            <MainCategories />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Explore Hot MainCategories */}

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

      <Footer8 />
    </>
  );
};

export default dynamic(() => Promise.resolve(home_10), { ssr: false });
