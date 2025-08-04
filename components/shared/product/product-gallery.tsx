"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ProductGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <>
      <div className="flex justify-center lg:justify-end m-5 lg:me-16">
        <div className="flex flex-col gap-4">
          <Image
            src={images[currentImage]}
            alt={images[currentImage]}
            width={750}
            height={750}
            className={`${cn} min-h-[300px] object-cover object-center rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.05)]`}
          />
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={images[currentImage]}
                width={100}
                height={100}
                onClick={() => setCurrentImage(idx)}
                className={`rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] transition-shadow cursor-pointer ${
                  idx == currentImage ? "border-black border-2" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
