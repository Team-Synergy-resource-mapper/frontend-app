'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

// redux
import { fetchproperties } from '../../store/reducers/data/propertyReducer';

const Properties = ({ subData, category, setNoPages, currentPage }) => {
  const dispatch = useDispatch();
  const { properties, isLoading } = useSelector((state) => state.property);

  useEffect(() => {
    const queryParams = {
      PageSize: 20,
      PageNumber: 1,
      SortBy: 'id',
      SortOrder: 'asc',
      SearchKey: '',
      numberOfPages: 2,
      category: category,
      subCategory: subData,
    };
    dispatch(fetchproperties(queryParams));
  }, [dispatch, subData]);

  useEffect(() => {
    if (Array.isArray(properties)) {
      const pageCount = Math.ceil(properties.length / 20); // 20 = PageSize
      if (typeof setNoPages === 'function') {
        setNoPages(pageCount);
      }
    }
  }, [properties]);

  const maxRating = 5;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {properties.slice(10 * (currentPage - 1), 10 * currentPage).map((item) => (
        <div className="col-12" key={item?.id}>
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
                        {Array.isArray(item?.slideImg) && item.slideImg.length > 0 ? (
                          item.slideImg.map((slide, i) => (
                            <SwiperSlide key={i}>
                              <FallbackImage
                                width={250}
                                height={250}
                                className="rounded-4 col-12 js-lazy"
                                src={slide}
                                fallbackSrc={
                                  item.category === 'vehicle'
                                    ? '/category/vehicle.png'
                                    : item.category === 'property'
                                      ? '/category/house.png'
                                      : '/category/electronics.png'
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
                              src={''}
                              fallbackSrc={
                                item.category === 'vehicle'
                                  ? '/category/vehicle.png'
                                  : item.category === 'property'
                                    ? '/category/house.png'
                                    : '/category/electronics.png'
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

              {/* Text Section */}
              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">
                  {item?.title}
                </h3>
                <div className="mt-10">
                  <span
                    className="text-14 fw-600"
                    style={{
                      color: '#1e40af', // formal deep blue
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="text-16 lh-18 mt-20">
                  <div
                    className="fw-700 uppercase"
                    style={{
                      background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '1.5px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {item.subCategory?.toUpperCase()}

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

              </div>

              {/* Pricing Section */}
              <div className="col-md-auto text-right md:text-left">


                <Link
                  href={item.url ?? '#'}
                  className="button -md -dark-1 bg-blue-1 text-white mt-24"
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

export default Properties;


const FallbackImage = ({ src, fallbackSrc, ...props }) => {
  const [imgSrc, setImgSrc] = useState(fallbackSrc);

  useEffect(() => {
    const isInvalid =
      !src || src.trim() === '' || src === 'null' || src === 'undefined';
    setImgSrc(isInvalid ? fallbackSrc : src);
  }, [src, fallbackSrc]);

  return (
    <img
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
      alt="image"
    />
  );
};
