import React from "react";
import Image from "next/image";


export default function Fiture() {
    return (
        <div className=" p-4 rounded-lg shadow-md">
             <div className="flex">
                <Image src="/assets/couple.png" alt="Fitur 1" width={100} height={100} />
             </div>
        </div>
    );
}