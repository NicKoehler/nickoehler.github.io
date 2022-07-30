import { useEffect, useState } from "react";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpButton = () => {
  const [style, setStyle] = useState({ display: "none" });

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setStyle({ display: "block" });
    } else {
      setStyle({ display: "none" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction, true);
    return () => window.removeEventListener("scroll", scrollFunction, true);
  });

  return (
    <FontAwesomeIcon
      icon={faCircleUp}
      id="upButton"
      style={style}
      onClick={() => {
        window.scrollTo(0, 0, "smooth");
      }}
    />
  );
};

export default UpButton;
