'use client'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchWishList } from "../../../store/reducers/data/wishlistReducer";

const Properties = () => {
  // store states
  const dispatch = useDispatch();
  const {wishList, isLoading} = useSelector(state=>state.wishlist);

  // data pre-fetching
  useEffect(()=>{
    dispatch(fetchWishList());
  },[dispatch])

  if(isLoading){
    return <h1>Loading...</h1>
  }
  return (
    <>
      {wishList.slice(0, 5).map((item) => (
        <div className="col-12" key={item.id}>
          <div className="row x-gap-20 y-gap-30">
            <div className="col-md-auto">
              <div className="cardImage ratio ratio-1:1 w-200 md:w-1/1 rounded-4">
                <div className="cardImage__content">
                  <Image
                    width={200}
                    height={200}
                    className="rounded-4 col-12 js-lazy"
                    src={item.img}
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
            {/* End col */}

            <div className="col-md">
              <h3 className="text-18 lh-14 fw-500">{item?.title}</h3>
              <div className="d-flex x-gap-5 items-center pt-10">
                <p className="fw-500 text-16">
                  {`${item.category}   (${item.subCategory})`}
                </p>
              </div>

              <div className="row x-gap-10 y-gap-10 items-center pt-20">
                <div className="col-auto">
                  <p className="text-14 ">
                   {item.description}
                  </p>
                </div>
                <div className="col-auto">
                  <div className="size-3 rounded-full bg-light-1" />
                </div>

              </div>
              {/* End .row */}

              <div className="row x-gap-10 y-gap-10 pt-20">
              <div className="row x-gap-10 y-gap-10 items-center">
                  <div className="col-auto">
                    <button className="flex-center  bg-light-2 rounded-4 size-35">
                      <i className="icon-eye text-primary  text-16 text-light-1" />
                    </button>
                  </div>
                  <div className="col-auto">
                    <button className="flex-center bg-light-2 rounded-4 size-35">
                      <i className="icon-edit text-success text-16 text-light-1" />
                    </button>
                  </div>
                  <div className="col-auto">
                    <button className="flex-center bg-light-2 rounded-4 size-35">
                      <i className="icon-trash-2 text-danger text-16 text-light-1" />
                    </button>
                  </div>
                </div>
                
              </div>
              {/* End .row */}
            </div>
            {/* End col */}

            <div className="col-md-auto text-right md:text-left">
              <div className="d-flex flex-column justify-between h-full">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">{`Ad Type: - ${item.condition}`}</div>
                    <div className="text-14 lh-14 text-light-1">
                      30 views
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item?.ratings}
                    </div>
                  </div>
                </div>
                <div className="pt-24">
                  <div className="fw-500">Starting from</div>
                  <span className="fw-500 text-blue-1">US$72</span> / night
                </div>
              </div>
            </div>
            {/* End col */}
          </div>
          {/* End .row */}
        </div>
      ))}
    </>
  );
};

export default Properties;
