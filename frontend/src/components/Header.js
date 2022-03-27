import React from "react";

function Header({ pages }) {

    const route = window.location.pathname
  return (
    <div className="relative">
      <div className="max-w-full mx-auto bg-blue-700 px-4 sm:px-6 sticky md:sticky top-0 z-[1000]">
        <div className="flex justify-between items-center  py-5 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
          </div>
          <nav className="md:flex md:space-x-10 space-x-5">
          <a
              href="/"
              className={route === "/" ? `text-lg font-medium text-white border-b-yellow-300 border-b-2` : ` text-lg font-medium text-white`}
            >
              Home
            </a>
            <a
              href="/subscribe"
              className={route === "/subscribe" ? `text-lg font-medium text-white border-b-yellow-300 border-b-2` : ` text-lg font-medium text-white`}
            >
              Mobile Subs
            </a>
          </nav>
          <div className=" md:flex items-center justify-end md:flex-1 lg:w-0"></div>
        </div>
      </div>

      <div className="md:mx-44 mx-4">{pages}</div>
    </div>
  );
}

export default Header;
