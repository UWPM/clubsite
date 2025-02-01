import Image from "next/image";
import { ProfileForm } from "./form";

export default function Hero() {
  return (
    <>
      {/* <Image
        alt="background"
        width={1600}
        height={800}
        src="/images/hexagon.png"
        className="absolute inset-0 left-1/2 top-20 aspect-auto -translate-x-1/2 object-contain"
      /> */}

      <ProfileForm />

    </>
  );
}
