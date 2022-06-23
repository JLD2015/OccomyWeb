import lottie from "lottie-web";
import { useEffect } from "react";

export default function ResetPasswordForm() {
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      autoplay: true,
      loop: false,
      animationData: require("../../public/animations/success.json"),
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
