import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) {
    return null;
  }

  return (
   <button
  onClick={scrollToTop}
  aria-label="Scroll to top"
  className="
    group
    fixed
    bottom-7
    right-7
    z-50
    w-14
    h-14
    rounded-full
    bg-white
    border-2
    border-[#5B7F46]
    text-[#5B7F46]
    flex
    items-center
    justify-center
    shadow-lg
    transition-all
    duration-300
    ease-out
    hover:bg-[#5B7F46]
    hover:text-white
    hover:shadow-2xl
    hover:-translate-y-2
    active:scale-90
  "
>
  {/* Animated Ring */}
  <span
    className="
      absolute
      inset-0
      rounded-full
      border-2
      border-[#5B7F46]
      opacity-0
      group-hover:opacity-100
      group-hover:scale-125
      transition-all
      duration-500
    "
  ></span>

  {/* Arrow */}
  <ArrowUp
    size={23}
    strokeWidth={2.5}
    className="
      relative
      z-10
      transition-transform
      duration-300
      group-hover:-translate-y-1
      group-hover:scale-110
    "
  />

  {/* Tooltip */}
  <span
    className="
      absolute
      right-16
      top-1/2
      -translate-y-1/2
      whitespace-nowrap
      bg-gray-800
      text-white
      text-xs
      font-medium
      px-3
      py-2
      rounded-lg
      opacity-0
      translate-x-2
      pointer-events-none
      group-hover:opacity-100
      group-hover:translate-x-0
      transition-all
      duration-300
    "
  >
    Back to Top
  </span>
</button>
  );
};

export default ScrollToTop;