import React from "react";
import Image from "next/image";

export default function Fiture() {
  return (
    <div className="p-4 rounded-lg shadow-md relative w-full h-full flex items-center justify-center">
      
      {/* Gambar utama */}
      <div className="absolute top-72 xxs:top-52 xs:top-44 s:top-64 md:top-80 right-1 md:right-3">
        <Image
          src="/assets/dres-code.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 sm:w-32 md:w-40 lg:w-52 h-auto"
        />
      </div>
      <div className="absolute top-0 right-7">
        <Image
          src="/assets/alamat.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-26 sm:w-32 md:w-40 lg:w-52 h-auto"
        />
      </div>
      <div className="absolute left-3 xxs:left-12 md:left-20">
        <Image
          src="/assets/rsvp.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-24 xxs:min-w-16 s:w-28 sm:w-32 md:w-40 lg:w-52 h-auto"
        />
      </div>
      <div className="absolute xxs:bottom-72 xs:bottom-60 s:bottom-80 md:bottom-80 md2:top-110 xxs:right-20 xs:right-28 iphone:bottom-96 iphone:right-24  md:right-32">
        <Image
          src="/assets/couple.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="min-w-40 xxs:min-w-36 s:min-w-44 sm:w-32 md:w-48 lg:w-52 md2:60 h-auto"
        />
      </div>
       <div className="absolute bottom-80 xxs:bottom-64 xs:bottom-56 s:bottom-72 iphone:bottom-92 md:bottom-80 -right-8 xxs:-right-8 xs:-right-4 s:-right-12 iphone:-right-14 md:right-1">
        <Image
          src="/assets/love-story.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-40 xxs:w-36 s:w-44 iphone:w-48 sm:w-32 md:w-48 md2:w-96 lg:w-52 h-auto"
        />
      </div>
       <div className="absolute bottom-56 xxs:bottom-44 xs:bottom-36 iphone:bottom-60 s:bottom-52 md:bottom-48 right-0 xxs:right-4 s:right-6 iphone:right-3 md:right-5">
        <Image
          src="/assets/gift.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-28 xxs:w-24 s:w-28 iphone:w-32 sm:w-32 md:w-40 lg:w-52 h-auto"
        />
      </div>

      {/* Gallery */}
      <div className="absolute top-40 xxs:top-32 iphone:top-44 xs:top-20 s:top-40 md:top-32 md2:top-40 md3:top-44 tb:top-48 lg:top-56 xl:top-26  left-6 xxs:left-10 iphone:left-12 xs:left-12 s:left-12 md:left-16 lg:left-20 xl:left-12">
        <Image
          src="/assets/gallery.png"
          alt="Gallery"
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 iphone:w-36 md:w-40 lg:w-60 md2:w-48 md3:w-56 xl:w-28   h-auto"
        />
      </div>
      <div className="absolute top-10 left-10 w-7 h-7 bg-black z-50">
        <div className="w-12 h-12 bg-red-500 text-white items-center"> 
            <h3 className="block xxs:hidden">default</h3>
            <h3 className="hidden xxs:block xs:hidden">xxs</h3>
            <h3 className="hidden xs:block s:hidden">xs</h3>
            <h3 className="hidden s:block iphone:hidden">s</h3>
            <h3 className="hidden iphone:block md:hidden">iphone</h3>
            <h3 className="hidden md:block md2:hidden">md</h3>
            <h3 className="hidden md2:block md3:hidden">md2</h3>
            <h3 className="hidden md3:block tb:hidden">md3</h3>
            <h3 className="hidden tb:block lg:hidden">tb</h3>
            <h3 className="hidden lg:block xl:hidden">lg</h3>
            <h3 className="hidden xl:block '2xl':hidden">xl</h3>
            <h3 className="hidden '2xl':block">2xl</h3>
        </div>
      </div>
    </div>
  );
}