"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function ProductGalleryWW({ images }: { images: string[] }) {
  const safe = images?.length ? images : ["/placeholder.png"];
  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx((i) => (i + d + safe.length) % safe.length);

  return (
    <div className="w-full">
      {/* HERO (edge-to-edge image) */}
      <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-black/5 bg-white">
        <Image
          src={safe[idx]}
          alt={`Image ${idx + 1}`}
          fill
          priority
          className="object-cover object-center" // <- cover (not fill)
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Arrows OVER the image */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => go(-1)}
          className="lg:block hidden
            absolute left-3 top-1/2 -translate-y-1/2 z-10
            h-10 w-10 rounded-full bg-white/95 text-[#724e31] shadow-md
            place-items-center hover:shadow-lg cursor-pointer
          "
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={() => go(1)}
          className="lg:block hidden
            absolute right-3 top-1/2 -translate-y-1/2 z-10
            h-10 w-10 rounded-full bg-white/95 text-[#724e31] shadow-md
            place-items-center hover:shadow-lg cursor-pointer
          "
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-3">
        {safe.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setIdx(i)}
            aria-label={`Show image ${i + 1}`}
            className={clsx(
              "relative aspect-square rounded-xl overflow-hidden bg-white border transition",
              i === idx
                ? "ring-2 ring-gray-900 border-transparent"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
