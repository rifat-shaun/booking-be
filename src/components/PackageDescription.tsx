"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useState } from "react";

function AccordionSingleItem({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="px-6 py-1 border-2 mb-4 rounded-2xl shadow-md">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className="font-light text-left">
            {content}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const PackageDescription = ({
  children,
  packageName,
  packageData,
}: {
  children: React.ReactNode;
  packageName: string;
  packageData: any;
}) => {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-indigo-100 grid place-items-center">
      <div className="w-full max-w-screen-xl mx-auto bg-white px-5 lg:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-20 mx-auto">
          <div className="max-md:order-last">
            <div className="text-sm font-light text-gray-600 my-3 space-y-3">
              <h3 className="text-lg font-bold text-gray-800">Description</h3>
              <p>
                As you journey along the Trans-Canada Highway departing from
                Banff, the picturesque landscape unfolds before you like a
                canvas painted by nature&apos;s hand. The towering peaks of the
                Canadian Rockies stand sentinel on either side, their
                snow-capped summits glistening in the sunlight. Lush forests
                cloak the mountainsides, their verdant hues contrasting with the
                rugged terrain.
              </p>

              <p>
                As you wind your way through the mountain passes, each bend in
                the road reveals a new vista, each more breathtaking than the
                last. The air is crisp and clean, tinged with the scent of pine
                and wildflowers. Wildlife may make an appearance, with deer
                grazing by the roadside or eagles soaring overhead, adding to
                the sense of wonder and adventure.
              </p>
            </div>

            {/* Accordion Items */}
            <div className="mt-10">
              <AccordionSingleItem
                title="Additional info"
                content="Departing from Banff, your adventure begins with a scenic drive along the Trans-Canada Highway, offering panoramic views of towering peaks and lush forests"
              />
              <AccordionSingleItem
                title="Cancellation policy"
                content="Departing from Banff, your adventure begins with a scenic drive along the Trans-Canada Highway, offering panoramic views of towering peaks and lush forests"
              />
            </div>
          </div>

          {/* Booking section with Calender */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PackageDescription;
