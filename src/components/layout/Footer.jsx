import React from "react";

const Footer = () => {
  return (
    <footer className="w-full lg:ml-64 lg:w-[calc(100%-16rem)] ">
      <div className="w-full px-4 sm:px-6 py-4">
        <div className="flex items-center justify-center">
          <p className="text-center text-sm text-[#52664A]">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#5B7F46]">
              SchoolHub
            </span>
            <span className="text-[#687A60]">
              {" "}. All Rights Reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;