
'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import MainMenu from "../MainMenu";

import MobileMenu from "../MobileMenu";

const Header1 = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  return (
    <>
      <header
        className={`header -type-2 ${navbar ? "bg-dark-1 is-sticky" : ""}`}
      >
        <div className="header__container px-60 xl:px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto col-auto-menu">
              <div className="header-menu">
                <div className="header-menu__content">
                  <MainMenu style="text-white" />
                </div>
              </div>
              {/* End header-menu */}
            </div>
            {/* End col-auto */}

            <div className="col-auto">
              <Link href="/" className="header-logo">
                <img src="/img/general/logo-light.svg" alt="logo icon" />
                <img src="/img/general/logo-dark.svg" alt="logo icon" />
              </Link>
              {/* End logo */}
            </div>
            {/* End col-auto */}

            <div className="col-auto">
              <div className="d-flex items-center">
                {/* Start btn-group */}
                <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                  <Link
                    href="/login"
                    className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
                  >
                    Become An Expert
                  </Link>
                  {/* <Link
                    href="/signup"
                    className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                  >
                    Sign In / Register
                  </Link> */}
                </div>
                {/* End btn-group */}

                {/* Start mobile menu icon */}
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                  <div>
                    <Link
                      href="/login"
                      className="d-flex items-center icon-user text-inherit text-22"
                    />
                  </div>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />

                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu />
                      {/* End MobileMenu */}
                    </div>
                  </div>
                </div>
                {/* End mobile menu icon */}
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
      {/* End header */}
    </>
  );
};

export default Header1;
