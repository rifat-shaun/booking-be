"use client";
import { IPackage } from "@/type";
import Image from "next/image";
import RoadMap from "../../public/images/road-map.jpeg";

function BannerSection({ packages }: { packages: IPackage }) {
  const filterPackages = packages?.child_packages?.find(
    (item: any) => item.name === "Morning"
  );

  return (
    <section className="relative py-8 lg:pt-12 lg:pb-28 bg-white">
      <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col gap-5">
        <div>
          <h1 className="font-newake text-center text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900">
            Amazing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 from-20% via-blue-600 via-30% to-green-600">
              {filterPackages ? filterPackages.name : ""} {packages?.name}
            </span>{" "}
          </h1>
          <p className="mt-8 text-gray-700">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
            repellat perspiciatis aspernatur quis voluptatum porro incidunt,
            libero sequi quos eos velit
          </p>
        </div>
        <div className="relative w-full h-auto overflow-hidden rounded-lg">
          <Image src={RoadMap} alt="Hero image" width={1280} height={500} />
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
