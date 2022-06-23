import lottie from "lottie-web";
import { useEffect } from "react";

export default function FailedAnimation() {
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      autoplay: true,
      loop: false,
      animationData: require("../../public/animations/failed.json"),
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  return (
    <>
      <div id="lottie"></div>
    </>
  );
}
