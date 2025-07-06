'use client'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRecomendList } from "../../../store/reducers/data/wishlistReducer";
import { axiosMLService } from "@/utils/axios/axios";

const Properties = ({ id }) => {
  const dispatch = useDispatch();
  const { recomendList, isLoading } = useSelector(state => state.wishlist);

  useEffect(() => {
    console.log("Fetching recommendations for:", id);
    dispatch(fetchRecomendList(id));
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {recomendList.length === 0 ? (
        <div className="flex justify-center items-center py-40 text-center">
          <div>
            <p className="text-18 text-dark-1 fw-500">There are no recommendations yet.</p>
            <p className="text-14 text-light-1">Please check back later or explore similar ads.</p>
          </div>
        </div>
      ) : (
        recomendList.slice(0, 1000).map((item) => (
          <div className="col-12" key={item.id}>
            <div className="row x-gap-20 y-gap-30">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-200 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <FallbackImage
                      width={200}
                      height={200}
                      className="rounded-4 col-12 js-lazy"
                      src={item.img}
                      fallbackSrc={
                        item.category === "vehicle"
                          ? "/category/vehicle.png"
                          : item.category === "property"
                          ? "/category/house.png"
                          : "/category/electronics.png"
                      }
                      alt="image"
                    />
                  </div>
                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <h3 className="text-18 lh-14 fw-500">{item?.title}</h3>
                <div className="d-flex x-gap-5 items-center pt-10"></div>

                <div className="row x-gap-10 y-gap-10 items-center pt-20">
                  <div className="col-auto">
                    <p className="text-14 ">{item.description}</p>
                  </div>
                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1" />
                  </div>
                </div>
              </div>

              <div className="col-md-auto text-right md:text-left">
                <div className="d-flex flex-column justify-between h-full">
                  <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                    <div className="col-auto">
                      <div className="text-14 lh-14 fw-500">{`Category: - ${item.category}`}</div>
                      <div className="text-14 lh-14 text-light-1">
                        {item.subCategory}
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                        {item?.ratings}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
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
