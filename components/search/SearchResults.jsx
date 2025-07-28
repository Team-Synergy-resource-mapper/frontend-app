"use client";

import { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <>
      {results.map((item) => (
        <div className="col-12" key={item?.id || `item-${Math.random()}`}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              {/* Image Section */}
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4 custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation={true}
                      >
                        {/* Handle the actual API response structure */}
                        {Array.isArray(item?.image_urls) &&
                        item.image_urls.length > 0 ? (
                          item.image_urls.map((imageUrl, i) => (
                            <SwiperSlide key={i}>
                              <FallbackImage
                                width={250}
                                height={250}
                                className="rounded-4 col-12 js-lazy"
                                src={imageUrl}
                                fallbackSrc={
                                  item.main_category === "vehicle"
                                    ? "/category/vehicle.png"
                                    : item.main_category === "property"
                                    ? "/category/house.png"
                                    : "/category/electronics.png"
                                }
                                alt="image"
                              />
                            </SwiperSlide>
                          ))
                        ) : Array.isArray(item?.slideImg) &&
                          item.slideImg.length > 0 ? (
                          item.slideImg.map((slide, i) => (
                            <SwiperSlide key={i}>
                              <FallbackImage
                                width={250}
                                height={250}
                                className="rounded-4 col-12 js-lazy"
                                src={slide}
                                fallbackSrc={
                                  item.main_category === "vehicle"
                                    ? "/category/vehicle.png"
                                    : item.main_category === "property"
                                    ? "/category/house.png"
                                    : "/category/electronics.png"
                                }
                                alt="image"
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <FallbackImage
                              width={250}
                              height={250}
                              className="rounded-4 col-12 js-lazy"
                              src=""
                              fallbackSrc={
                                item.main_category === "vehicle"
                                  ? "/category/vehicle.png"
                                  : item.main_category === "property"
                                  ? "/category/house.png"
                                  : "/category/electronics.png"
                              }
                              alt="image"
                            />
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                  </div>
                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Section - Matches Properties component exactly */}
              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">{item?.title}</h3>
                <div className="mt-10">
                  <span
                    className="text-14 fw-600"
                    style={{
                      color: "#1e40af", // formal deep blue
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.main_category}
                  </span>
                </div>
                <div className="text-16 lh-18 mt-20">
                  <div
                    className="fw-700 uppercase"
                    style={{
                      background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "1.5px",
                      textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {item.sub_category?.toUpperCase()}
                  </div>
                </div>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{item?.description}</p>
                  </div>
                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>
                </div>

                {/* Search relevance indicator */}
                <div className="mt-15">
                  <span className="badge bg-light-2 text-dark-1 px-15 py-5 rounded-pill">
                    <i className="icon-search text-12 mr-5" />
                    Search Result
                  </span>
                  {item.created_at && (
                    <span className="text-12 text-light-1 ml-15">
                      Posted: {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Pricing Section - Matches Properties component exactly */}
              <div className="col-md-auto text-right md:text-left">
                {item.price && (
                  <div className="text-right md:text-left mb-10">
                    <div className="text-22 lh-12 fw-600 text-blue-1">
                      Rs. {item.price}
                    </div>
                  </div>
                )}

                <Link
                  href={item.url ?? "#"}
                  className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Availability
                  <div className="icon-arrow-top-right ml-15"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchResults;

const FallbackImage = ({ src, fallbackSrc, alt = "image", ...props }) => {
  const [imgSrc, setImgSrc] = useState(fallbackSrc);

  useEffect(() => {
    const isInvalid =
      !src || src.trim() === "" || src === "null" || src === "undefined";
    setImgSrc(isInvalid ? fallbackSrc : src);
  }, [src, fallbackSrc]);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
      alt={alt}
    />
  );
};
