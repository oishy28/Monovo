import Lottie from "lottie-react";
import window from "../assets/Window.json";

export default function WindowAnimation() {
  return (
    <Lottie
      animationData={window}
      loop={true}
      className="w-full h-full max-w-[500px]"
    />
  );
}
