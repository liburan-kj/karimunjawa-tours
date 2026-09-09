"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroFloats() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Cek lebar layar saat mount
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1100);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Jika mobile, jangan render apapun di HTML
  if (!isDesktop) return null;

  return (
    <div className="hero-floats" aria-hidden="true">
      <div className="hero-float hero-float--1">
        <Image
          src="/images/stand.jpg"
          alt=""
          fill
          sizes="170px"
          className="object-cover"
        />
      </div>
      <div className="hero-float hero-float--2">
        <Image
          src="/images/jump.jpg"
          alt=""
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <div className="hero-float hero-float--3">
        <Image
          src="/images/island-hopping.png"
          alt=""
          fill
          sizes="210px"
          className="object-cover"
        />
      </div>
      <div className="hero-float hero-float--4">
        <Image
          src="/images/scuba-diving.jpg"
          alt=""
          fill
          sizes="180px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
