import { useState, useEffect } from "react";

const usePageLoad = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      handleLoad(); // Manually call the handler
    } else {
      window.addEventListener("load", handleLoad); // Add event listener
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return isPageLoaded;
};

export default usePageLoad;
