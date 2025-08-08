import Lottie from "lottie-react";
import landscape from "../../assets/Landscape.json";

export default function LandscapeAnimation() {
  return (
    <Lottie
      animationData={landscape}
      loop={true}
      className="w-full h-full max-w-[500px]"
    />
  );
}
