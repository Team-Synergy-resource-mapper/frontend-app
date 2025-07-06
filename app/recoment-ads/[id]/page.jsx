// app/recoment-ads/[id]/page.jsx

import Header10 from "../../../components/header/header-10";
import Footer from "../common/Footer";
import WishlistTable from "../components/WishlistTable";

const IndexPage = ({ params }) => {
  const { id } = params;

  return (
    <>
      <div className="header-margin"></div>
      <Header10 />

      <section className="pt-40 pb-40 bg-light-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row y-gap-20 justify-between items-end pb-60 lg:pb-40 md:pb-32">
                <div className="col-12">
                  <h1 className="text-30 lh-14 fw-600">Recomended Advertisements</h1>
                  <div className="text-15 text-light-1">
                    Find the best buyer for your product
                  </div>
                </div>
              </div>

              <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                <WishlistTable id={id} />
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
