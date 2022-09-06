import lottie from "lottie-web";
import { useEffect } from "react";

export default function LoadingAnimation() {
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      autoplay: true,
      loop: true,
      animationData: require("../../public/animations/loading.json"),
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
