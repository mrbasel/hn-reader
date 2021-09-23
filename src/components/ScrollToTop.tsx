import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top of the page when navigating to a "/post" page
// ----- //
// When using chrome on mobile, sometimes after navigating
// to a post you end up in the middle of the page
// instead of being at the top, which is what this
// component is used for
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("post")) window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
