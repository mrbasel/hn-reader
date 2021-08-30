import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top of the page on any page change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("post")) window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
