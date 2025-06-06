"use client";

import { hotelsData } from "../data/hotels";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// third party import
import { Swiper, SwiperSlide } from "swiper/react";

// project import
import { fetchproperties } from "../../store/reducers/data/propertyReducer";

const Properties = () => {
  // store state
  const dispatch = useDispatch();
  const { properties, isLoading } = useSelector((state) => state.property);

  // pre fetching data
  useEffect(() => {
    const queryParams = {
      PageSize: 20,
      PageNumber: 1,
      SortBy: "id",
      SortOrder: "asc",
      SearchKey: "",
      numberOfPages: 2,
    };
    dispatch(fetchproperties(queryParams));
  }, [dispatch]);

  // constants
  const maxRating = 5;
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <>
      {properties.slice(0, 8).map((item) => (
        <div className="col-12" key={item?.id}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4  custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        {item?.slideImg?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <FallbackImage
                                width={250}
                                height={250}
                                className="rounded-4 col-12 js-lazy"
                                src={slide}
                                fallbackSrc={item.category === "vehicle"? `/category/vehicle.png`:item.category==="property"?"/category/house.png":"/category/electronics.png"} // replace with your hardcoded fallback image
                                alt="image"
                              />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                  {/* End image */}

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">
                  {item?.title}
                  <br className="lg:d-none" /> {item?.category}
                  <div className="d-inline-block ml-10">
                    {[...Array(maxRating)].map((_, index) => {
                      const numericRating = parseFloat(item.rating); // Convert the string to a number
                      return (
                        <i
                          key={index}
                          className={`icon-star text-10 ${
                            numericRating >= index + 1 // Full star
                              ? "text-yellow-2"
                              : numericRating > index // Half star
                              ? "text-yellow-2 half-star"
                              : "text-gray-3" // Empty star
                          }`}
                        ></i>
                      );
                    })}
                  </div>
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{item?.description}</p>
                  </div>

                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>

                  {/* <div className="col-auto">
                    <p className="text-14">2 km to city center</p>
                  </div> */}
                </div>

                <div className="text-14 lh-15 mt-20">
                  <div className="fw-500">{item.subCategory}</div>
                </div>

                {/* <div className="text-14 text-green-2 lh-15 mt-10">
                  <div className="fw-500">Free cancellation</div>
                  <div className="">
                    You can cancel later, so lock in this great price today.
                  </div>
                </div> */}
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      {item?.numberOfReviews} views
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item?.ratings}
                    </div>
                  </div>
                </div>

                <div className="">
                  {/* <div className="text-14 text-light-1 mt-50 md:mt-20">
                    8 nights, 2 adult
                  </div> */}
                  <div className="text-22 lh-12 fw-600 mt-5">
                    LKR {item?.price}
                  </div>
                  {/* <div className="text-14 text-light-1 mt-5">
                    +LKR 828 taxes and charges
                  </div> */}

                  <Link
                    href={item.url ?? '#'}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    See Availability{" "}
                    <div className="icon-arrow-top-right ml-15"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Properties;


const FallbackImage = ({ src, fallbackSrc, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
      alt="image"
    />
  );
};